using LocalGoods.Common.EfModels;
using LocalGoods.Services.IServices;

namespace LocalGoods.Service.Services
{
    public class ProductService : IProductService
    {
        public Task<Product> AddProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminAddFavoriteProducts(int[] ProductIds)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminAddProductCategory(ProductCategory category)
        {
            throw new NotImplementedException();
        }

        public Task<Product> AdminDeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminRemoveFavoriteProducts(int[] ProductIds)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminRemoveProductCategory(ProductCategory category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminRemoveTopProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminSetTopProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Task<ProductCategory> GetAllCategory()
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public Task<ProductCategory> GetCategoryById(int categoryId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> GetFavoriteProducts()
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetProductBySellerId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> GetProductsByCategoryId(int categoryId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Task<Product>> GetProductsBySearch(string search)
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetTopProduct()
        {
            throw new NotImplementedException();
        }

        public Task<Product> MakeAvailable(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<Product> MakeUnavailable(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<Product> UpdateProduct(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
