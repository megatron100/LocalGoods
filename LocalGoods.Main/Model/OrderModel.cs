using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class Order:BaseModel
    {
        
        public virtual  Product OrderItem { get; set; }
        public int Quantity { get; set; } = 1;
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalPrice {
            get
            {
                return (OrderItem.Price * Quantity);
            }
            set
            {
                TotalPrice = value;
            }
        }
        public string PaymentType { get; set; }
        public string OrderStatus { get; set; }
        public virtual Address DropAddress { get; set; }
        [ForeignKey("User")]
        public  int CustomerId  { get; set; }
        public DateTime OrderDate  { get; set; }

    }
}
