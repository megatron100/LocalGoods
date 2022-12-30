using LocalGoods.Common.EfModels;
using LocalGoods.DAL;
using LocalGoods.Service.Models;
using LocalGoods.Service.Services.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LocalGoods.Service.Services
{
    public class JwtService:IJwtService
    {

            private LocalGoodsDbContext _dbContext;  // can store in a database or a distributed cache
            private IConfiguration _configuration;

            public JwtService(IConfiguration configuration, LocalGoodsDbContext dbContext)
            {
                _configuration = configuration;
                _dbContext = dbContext;

            }

            // optional: clean up expired refresh tokens
            public void RemoveExpiredRefreshTokens(DateTime now)
            {
                var expiredTokens = _dbContext.Token.Where(x => x.ExpireAt < now).ToList();
                foreach (var expiredToken in expiredTokens)
                {
                    _dbContext.Token.Remove(expiredToken);
                }
                _dbContext.SaveChanges();
            }

            // can be more specific to ip, user agent, device name, etc.
            public void RemoveRefreshTokenByUserEmail(string userEmail)
            {
                var refreshTokens = _dbContext.Token.Where(x => x.UserEmail == userEmail).ToList();
                foreach (var refreshToken in refreshTokens)
                {
                    _dbContext.Token.Remove(refreshToken);
                }
                _dbContext.SaveChanges();
            }

            public JwtAuthResult GenerateTokens(string userEmail, Claim[] claims, DateTime now)
            {

                // var shouldAddAudienceClaim = string.IsNullOrWhiteSpace(claims?.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Aud)?.Value);
                var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
                var jwtToken = new JwtSecurityToken(
                    _configuration["JWT:ValidIssuer"],
                   _configuration["JWT:ValidAudience"],
                    claims,
                    expires: now.AddMinutes(Convert.ToInt32(_configuration["JWT:AccessTokenExpiration"])),
                   signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature));
                var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);

                var refreshToken = new RefreshToken
                {
                    UserEmail = userEmail,
                    TokenString = GenerateRefreshTokenString(),
                    ExpireAt = now.AddMinutes(Convert.ToInt32(_configuration["JWT:RefreshTokenExpiration"]))
                };

                _dbContext.Token.Add(refreshToken);

                return new JwtAuthResult
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
                _dbContext.SaveChanges();
            }

            public JwtAuthResult Refresh(string refreshToken, string accessToken, DateTime now)
            {
                var (principal, jwtToken) = DecodeJwtToken(accessToken);
                if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                string userEmail = principal.Claims.Where(x => x.Type == ClaimTypes.Email).Select(a => a.Value).FirstOrDefault();

                if (string.IsNullOrEmpty(userEmail))
                {
                    throw new SecurityTokenException("Invalid token");
                }
                var userTokens = _dbContext.Token.Where(x => x.TokenString == refreshToken.Trim()).Select(a => a);
                if (!userTokens.Any())
                {
                    throw new SecurityTokenException("Invalid token");
                }
                if (userTokens.FirstOrDefault().UserEmail != userEmail || userTokens.FirstOrDefault().ExpireAt < now)
                {

                    throw new SecurityTokenException("Invalid token");
                }

                return GenerateTokens(userEmail, principal.Claims.ToArray(), now); // need to recover the original claims
            }

            public (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token)
            {
                if (string.IsNullOrWhiteSpace(token))
                {
                    throw new SecurityTokenException("Invalid token");
                }
                var principal = new JwtSecurityTokenHandler()
                    .ValidateToken(token,
                        new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = _configuration["JWT:ValidIssuer"],
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"])),
                            ValidAudience = _configuration["JWT:ValidAudience"],
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ClockSkew = TimeSpan.FromMinutes(1)
                        },
                        out var validatedToken);
                return (principal, validatedToken as JwtSecurityToken);
            }

            private static string GenerateRefreshTokenString()
            {
                var randomNumber = new byte[32];
                using var randomNumberGenerator = RandomNumberGenerator.Create();
                randomNumberGenerator.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

    }
 
