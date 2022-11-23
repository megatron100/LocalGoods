namespace LocalGoods.Main.Model
{
    public class Rating:BaseModel
    {
        public int Stars { get; set; }
       
        public int SellerId { get; set; }

        public int CustomerId { get; set; }

    }
}
