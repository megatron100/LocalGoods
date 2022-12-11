namespace LocalGoods.Main.Model
{
    public class Payment:BaseModel
    {
        public string? PaymentId { get; set; }
        public decimal Amount { get; set; }

    }
}
