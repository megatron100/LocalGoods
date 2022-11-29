using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
    public class Order
    {
        [ForeignKey("OrderItem")]
        public int OrderId { get; set; }
        public DateTime OrderDate  { get; set; }
        public string OrderName { get; set; }
        public string PaymentType { get; set; }
        public string OrderStatus { get; set; }
        [ForeignKey("Address")]
        public int AdressId { get; set; }

        [ForeignKey("User")]
        public int userId { get; set; }
    }
}
