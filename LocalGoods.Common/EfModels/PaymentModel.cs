namespace  LocalGoods.Common.EfModels
    
{
    public class Payment:BaseModel
    {
        public string? PaymentId { get; set; }
        public decimal Amount { get; set; }

    }
}
