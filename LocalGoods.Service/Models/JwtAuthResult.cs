using LocalGoods.Common.EfModels;
using System.Text.Json.Serialization;

namespace LocalGoods.Service.Models
{
    public class JwtAuthResult
    {
        [JsonPropertyName("accessToken")]
        public string? AccessToken { get; set; }

        [JsonPropertyName("refreshToken")]
        public RefreshToken? RefreshToken { get; set; }
    }
}
