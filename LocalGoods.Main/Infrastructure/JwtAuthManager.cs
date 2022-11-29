namespace LocalGoods.Main.Infrastructure
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Immutable;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Text.Json.Serialization;
    using Microsoft.IdentityModel.Tokens;

    namespace LocalGoods.Main.Infrastructure
    {
        public interface IJwtAuthManager
        {
            IImmutableDictionary<string, RefreshToken> UsersRefreshTokensReadOnlyDictionary { get; }
            JwtAuthResult GenerateTokens(string userEmail, Claim[] claims, DateTime now);
            JwtAuthResult Refresh(string refreshToken, string accessToken, DateTime now);
            void RemoveExpiredRefreshTokens(DateTime now);
            void RemoveRefreshTokenByUserEmail(string userEmail);
            (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token);
        }

        public class JwtAuthManager : IJwtAuthManager
        {
            public IImmutableDictionary<string, RefreshToken> UsersRefreshTokensReadOnlyDictionary => _usersRefreshTokens.ToImmutableDictionary();
            private readonly ConcurrentDictionary<string, RefreshToken> _usersRefreshTokens;  // can store in a database or a distributed cache
            private IConfiguration _configuration;

            public JwtAuthManager(IConfiguration configuration)
            {
                _configuration = configuration;
                _usersRefreshTokens = new ConcurrentDictionary<string, RefreshToken>();

            }

            // optional: clean up expired refresh tokens
            public void RemoveExpiredRefreshTokens(DateTime now)
            {
                var expiredTokens = _usersRefreshTokens.Where(x => x.Value.ExpireAt < now).ToList();
                foreach (var expiredToken in expiredTokens)
                {
                    _usersRefreshTokens.TryRemove(expiredToken.Key, out _);
                }
            }

            // can be more specific to ip, user agent, device name, etc.
            public void RemoveRefreshTokenByUserEmail(string userEmail)
            {
                var refreshTokens = _usersRefreshTokens.Where(x => x.Value.UserEmail==userEmail).ToList();
                foreach (var refreshToken in refreshTokens)
                {
                    _usersRefreshTokens.TryRemove(refreshToken.Key, out _);
                }
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
                /// _usersRefreshTokens.AddOrUpdate(refreshToken.TokenString, refreshToken);
                _usersRefreshTokens.TryAdd(refreshToken.TokenString, refreshToken);
                var allTokens = _usersRefreshTokens.Values.ToArray();

                return new JwtAuthResult
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
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
                var existingRefreshToken = _usersRefreshTokens.Where(x => x.Key == refreshToken).Select(a => a).FirstOrDefault();

                if (_usersRefreshTokens.Where(x => x.Key==refreshToken).(refreshToken, out var existingRefreshToken))
                {
                    throw new SecurityTokenException("Invalid token");
                }
                if (existingRefreshToken.UserEmail != userEmail || existingRefreshToken.ExpireAt < now)
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

        public class JwtAuthResult
        {
            [JsonPropertyName("accessToken")]
            public string? AccessToken { get; set; }

            [JsonPropertyName("refreshToken")]
            public RefreshToken? RefreshToken { get; set; }
        }

        public class RefreshToken
        {
            [JsonPropertyName("useremail")]
            public string? UserEmail { get; set; }    // can be used for usage tracking
                                                      // can optionally include other metadata, such as user agent, ip address, device name, and so on

            [JsonPropertyName("tokenString")]
            public string? TokenString { get; set; }

            [JsonPropertyName("expireAt")]
            public DateTime ExpireAt { get; set; }
        }
    }

}
