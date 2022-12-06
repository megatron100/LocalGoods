using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class ShoppingCartItem : BaseModel
    {

        public virtual Product Product { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalAmount
        {

            get
            {
                return  (Product.Price * Quantity);
            }
            set
            {
                TotalAmount = value;
            }
        }

    }
}
