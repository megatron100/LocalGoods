using LocalGoods.Common.EfModels;
using LocalGoods.Service.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LocalGoods.Service.Services.IServices
{
    public interface IJwtService
    {

             JwtAuthResult GenerateTokens(string userEmail, Claim[] claims, DateTime now);
            JwtAuthResult Refresh(string refreshToken, string accessToken, DateTime now);
            void RemoveExpiredRefreshTokens(DateTime now);
            void RemoveRefreshTokenByUserEmail(string userEmail);
            (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token);

    }
    
}
