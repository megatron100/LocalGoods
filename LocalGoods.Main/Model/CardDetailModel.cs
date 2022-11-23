namespace LocalGoods.Main.Model
{
    public class CardDetail:BaseModel
    {
       
        public string CardNumber { get; set; }
        public string Expiry { get; set; }
        public string CardProvider { get; set; }
    }
}