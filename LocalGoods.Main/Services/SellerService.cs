using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;

namespace LocalGoods.Main.Services
{
    public class SellerService
    {
        private readonly LocalGoodsDbContext _dbContext;
        public SellerService(LocalGoodsDbContext context)
        {
            _dbContext = context;
        }
        public bool CheckSellerCertification(int userId)
        {
            if(userId == 0)
            {
                return false;
            }
            User seller=_dbContext.User.Where(x=>x.Id == userId).Select(a => a).FirstOrDefault();
            if(seller.Certification == null)
            {
                return false;
            }
            Certificate sellercerti = seller.Certification;
            
            var certificate = _dbContext.Certificate.Where(x => x.Id == sellercerti.Id);
            return true;
        }
    }
}
