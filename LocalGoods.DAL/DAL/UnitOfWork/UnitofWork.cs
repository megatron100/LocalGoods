using LocalGoods.DAL.Repository;
using LocalGoods.DAL;
using LocalGoods.Common.EfModels;

namespace LocalGoods.DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly LocalGoodsDbContext _context;

        //add your repository here and return implementation in public methods  

        private IRepository<User> _userRepository;
        private IRepository<Product> _productRepository;
        private IRepository<ProductCategory> _productCategoryRepository;
        private IRepository<ShoppingCartItem> _shoppingCartItemRepository;
        private IRepository<CardDetail> _cardDetailRepository;
        private IRepository<Rating> _ratingRepository;
        private IRepository<Certificate> _certificateRepository;
        private IRepository<Address> _addressRepository;
        private IRepository<Order> _orderRepository;
        private IRepository<RefreshToken> _refreshTokenRepository;

        public UnitOfWork(LocalGoodsDbContext context)
        {
            _context = context;
        }

        public LocalGoodsDbContext dbContext => _context;

        public IRepository<User> UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new Repository<User>(_context);
                }
                return _userRepository;
            }
            private set { }
        }

        public IRepository<Product> ProductRepository
        {
            get
            {
                if (_productRepository == null)
                {
                    _productRepository = new Repository<Product>(_context);
                }
                return _productRepository;
            }
            private set { }
        }

        public IRepository<ProductCategory> ProductCategoryRepository
        {
            get
            {
                if (_productCategoryRepository == null)
                {
                    _productCategoryRepository = new Repository<ProductCategory>(_context);
                }
                return _productCategoryRepository;
            }
            private set { }
        }

        public IRepository<ShoppingCartItem> ShoppingCartItemRepository
        {
            get
            {
                if (_shoppingCartItemRepository == null)
                {
                    _shoppingCartItemRepository = new Repository<ShoppingCartItem>(_context);
                }
                return _shoppingCartItemRepository;
            }
            private set { }
        }

        public IRepository<CardDetail> CardDetailRepository
        {
            get
            {
                if (_cardDetailRepository == null)
                {
                    _cardDetailRepository = new Repository<CardDetail>(_context);
                }
                return _cardDetailRepository;
            }
            private set { }
        }

        public IRepository<Rating> RatingRepository
        {
            get
            {
                if (_ratingRepository == null)
                {
                    _ratingRepository = new Repository<Rating>(_context);
                }
                return _ratingRepository;
            }
            private set { }
        }

        public IRepository<Certificate> CertificateRepository
        {
            get
            {
                if (_certificateRepository == null)
                {
                    _certificateRepository = new Repository<Certificate>(_context);
                }
                return _certificateRepository;
            }
            private set { }
        }

        public IRepository<Address> AddressRepository
        {
            get
            {
                if (_addressRepository == null)
                {
                    _addressRepository = new Repository<Address>(_context);
                }
                return _addressRepository;
            }
            private set { }
        }

        public IRepository<Order> OrderRepository
        {
            get
            {
                if (_orderRepository == null)
                {
                    _orderRepository = new Repository<Order>(_context);
                }
                return _orderRepository;
            }
            private set { }
        }

        public IRepository<RefreshToken> RefreshTokenRepository
        {
            get
            {
                if (_refreshTokenRepository == null)
                {
                    _refreshTokenRepository = new Repository<RefreshToken>(_context);
                }
                return _refreshTokenRepository;
            }
            private set { }
        }

        public int Save()
        {
            return _context.SaveChanges();
        }
        public async Task<int> SaveAsync()
        {
          return  await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task DisposeAsync()
        {
            await _context.DisposeAsync();

        }

    }
    
}
