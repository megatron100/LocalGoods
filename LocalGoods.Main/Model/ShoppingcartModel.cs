using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class ShoppingCart:BaseModel
    {

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User user { get; set; }
        public virtual ICollection<ShoppingCartItem>? CartProducts { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalAmount
        {
           get
                {
                    decimal total = 0;
                    foreach (var item in CartProducts)
                    {
                        total += item.Total;
                    }
                    return total;
                }
                set
                {
                    TotalAmount = value;
                }
            
        }
        
        public int TotalQuantity 
        {
            get
            {
                {
                    int total = 0;
                    foreach (var item in CartProducts)
                    {
                        total += item.Quantity;
                    }
                    return total;
                }
            }
        
        }
        
    }
}
