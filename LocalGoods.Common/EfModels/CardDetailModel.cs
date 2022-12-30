using LocalGoods.Common.EfModels;

namespace LocalGoods.Common.EfModels
{
    public class CardDetail:BaseModel
    {
       
        public string CardNumber { get; set; }
        public string Expiry { get; set; }
        public string CardProvider { get; set; }
    }
}