using System.Text.Json.Serialization;

namespace LocalGoods.Main.Model.BussinessModels
{
    public class RefreshTokenRequest
    {
        [JsonPropertyName("refreshToken")]
        public string RefreshToken { get; set; }
    }
}
