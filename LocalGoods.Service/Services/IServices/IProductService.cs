using LocalGoods.Common.EfModels;

namespace LocalGoods.Services.IServices
{
    public interface IProductService
    {
        //service related to sellerproduct, product, productimage, productcategory, productSearch

        //async methods
        public Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<Product> GetTopProduct();
        Task<List<Product>> GetFavoriteProducts();
        Task<Product> GetProductBySellerId(int id);
        Task<List<Product>> GetProductsByCategoryId(int categoryId);
        IEnumerable<Task<Product>> GetProductsBySearch(string search);
        Task<Product> AddProduct(Product product);
        Task<Product> UpdateProduct(Product product);

        Task<ProductCategory> GetAllCategory();
        Task<ProductCategory> GetCategoryById(int categoryId);

        //unpublicsh product
        Task<Product> MakeUnavailable(int productId);
        //publish product
        Task<Product> MakeAvailable(int productId);
        //

        //admin related methods
        Task<Product> AdminDeleteProduct(int id);
         
        Task<bool> AdminAddFavoriteProducts(int[] ProductIds);
        Task<bool> AdminRemoveFavoriteProducts(int[] ProductIds);

        Task<bool> AdminAddProductCategory(ProductCategory category);
        Task<bool> AdminRemoveProductCategory(ProductCategory category);

        Task<bool> AdminSetTopProduct(Product product);
        Task<bool> AdminRemoveTopProduct(Product product);

    }
}
