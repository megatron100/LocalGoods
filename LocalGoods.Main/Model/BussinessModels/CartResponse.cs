namespace LocalGoods.Main.Model.BussinessModels
{
    public class CartResponse
    {
        
        public List<ShoppingCartItem> cartItems { get; set; }
        public decimal TotalAmount { get; set; }
        public int TotalQuantity { get; set; }
       
    }
}
