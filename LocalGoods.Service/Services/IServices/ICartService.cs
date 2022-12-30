using LocalGoods.Common.EfModels;

namespace LocalGoods.Service.Services.IServices
{
    public interface ICartService
    {
        Task<List<ShoppingCartItem>> GetCartItems( );
        Task<ShoppingCartItem> GetCartItemByProductId(int productId);
        
        Task<bool> isExistsInCart(int porductId);
        Task<bool> AddProductToCart(  int productId, int quantity);
        Task<bool> MinusProductFromCart(int productId);
         
        Task<bool> RemoveCartItem(int cartItemId);
        Task<bool> RemoveAllCartItems();

    }
}
