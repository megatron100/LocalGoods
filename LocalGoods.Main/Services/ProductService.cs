using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;

namespace LocalGoods.Main.Services
{
    public class ProductService
    {
        private readonly LocalGoodsDbContext _dbContext;
        public ProductService(LocalGoodsDbContext context)
        {
            _dbContext = context;
        }

        public Product GetProductById(int id)
        {
            if (id == 0)
            {
                return null;
            }
            Product product = _dbContext.Product.Where(x => x.Id == id).FirstOrDefault();
            if (product == null)
            {
                return null;
            }
            return product;

        }

    }
}
