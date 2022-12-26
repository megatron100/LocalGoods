
namespace LocalGoods.Main.DAL.Models
{
    public class Rating:BaseModel
    {
        public int Stars { get; set; }
       
        public int SellerId { get; set; }

        public int CustomerId { get; set; }

    }
}
