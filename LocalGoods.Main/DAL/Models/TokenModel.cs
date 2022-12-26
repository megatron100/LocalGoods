
namespace LocalGoods.Main.DAL.Models
{
    public class RefreshToken:BaseModel
    {
        public string? UserEmail { get; set; }
        public string? TokenString { get; set; }
        public DateTime ExpireAt { get; set; }

    }
}
