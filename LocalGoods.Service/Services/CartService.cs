using LocalGoods.Common.EfModels;
using LocalGoods.Service.Services.IServices;

namespace LocalGoods.Service.Services
{
    public class CartService : ICartService
    {
        public Task<bool> AddProductToCart(int productId, int quantity)
        {
            throw new NotImplementedException();
        }

        public Task<ShoppingCartItem> GetCartItemByProductId(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<List<ShoppingCartItem>> GetCartItems()
        {
            throw new NotImplementedException();
        }

        public Task<bool> isExistsInCart(int porductId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> MinusProductFromCart(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveAllCartItems()
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveCartItem(int cartItemId)
        {
            throw new NotImplementedException();
        }
    }
}
