using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LocalGoods.Main.Model
{
    public class Order:BaseModel
    {
        
        public virtual  Product OrderItem { get; set; }
        public int Quantity { get; set; } = 1;
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalPrice {
            get;set;
        }
        [JsonIgnore]
        public string? PaymentType { get; set; }
        public string OrderStatus { get; set; }
        public virtual Address DropAddress { get; set; }
       
        public virtual User? Customer  { get; set; }
        public DateTime OrderDate  { get; set; }

    }
}
