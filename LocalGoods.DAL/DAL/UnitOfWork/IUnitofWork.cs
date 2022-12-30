using LocalGoods.DAL.Repository;
using LocalGoods.Common.EfModels;

namespace LocalGoods.DAL.UnitOfWork
{
    public interface IUnitOfWork 
    {
        // generic repository + Efcore + non-generic Unitofwork

        //dbcontext
        LocalGoodsDbContext dbContext { get; }

        IRepository<User> UserRepository { get; }
        IRepository<Product> ProductRepository { get; }
        IRepository<ProductCategory> ProductCategoryRepository { get; }
        IRepository<ShoppingCartItem> ShoppingCartItemRepository { get; }
        IRepository<CardDetail> CardDetailRepository { get; }
        IRepository<Rating> RatingRepository { get; }
        IRepository<Certificate> CertificateRepository { get; }
        IRepository<Address> AddressRepository { get; }
        IRepository<Order> OrderRepository { get; }
        IRepository<RefreshToken> RefreshTokenRepository { get; }

        int Save();
        Task<int> SaveAsync();

        void Dispose();
        Task DisposeAsync();

    }
}
