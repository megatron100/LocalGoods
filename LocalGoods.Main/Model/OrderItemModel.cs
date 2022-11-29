using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class OrderItem:BaseModel
    {
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
        public int Price { get; set; }

    }
}
