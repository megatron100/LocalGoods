using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class ShoppingCartItem:BaseModel
    {
        [ForeignKey("Product")]
        public int ShoppingCartItemId { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }

    }
}
