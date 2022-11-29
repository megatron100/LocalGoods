using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class ShoppingCart:BaseModel
    {
        [ForeignKey("ShoppingCartItem")]
        public int CartId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User user { get; set; }
        public List<ShoppingCartItem>? CartProducts { get; set; }
    }
}
