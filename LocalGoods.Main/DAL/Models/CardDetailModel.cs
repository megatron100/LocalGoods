using LocalGoods.Main.DAL.Models;

namespace LocalGoods.Main.DAL.Models
{
    public class CardDetail:BaseModel
    {
       
        public string CardNumber { get; set; }
        public string Expiry { get; set; }
        public string CardProvider { get; set; }
    }
}