using LocalGoods.Main.Controllers;
using LocalGoods.Main.DAL;
using LocalGoods.Main.Infrastructure;
using LocalGoods.Main.Model;
using System.Security.Claims;
using System.Web;

namespace LocalGoods.Main.Services
{
    public class UserService
    {
        private readonly LocalGoodsDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(LocalGoodsDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public User GetUserById(int id)
        {

            var customer = _dbContext.User.Where(x => x.Id == id).Select(a => a).FirstOrDefault();
            if (customer == null)
            {
                return null;
            }
            return customer;

        }
        public Product GetProductById(int id)
        {

            var product = _dbContext.Product.Where(x => x.Id == id).Select(a => a).FirstOrDefault();
            if (product == null)
            {
                return null;
            }
            return product;

        }

        public User GetUserByEmail(string email)
        {

                var customer = _dbContext.User.Where(x => x.Email == email.Trim()).Select(a => a).FirstOrDefault();
                if (customer != null)
                {
                    return customer;
                }

            return null ;
        }

        public bool ValidateUser(User customer)
        {
            if (customer == null)
            {
                return false;
            }
            if (EmailValidator.Validate(customer.Email) || customer.Password == null)
            {
                return false;
            }
            if (string.IsNullOrEmpty(customer.Password) || string.IsNullOrWhiteSpace(customer.Password))
            {
                return false;
            }
            bool isExist = _dbContext.User.Where(x => x.Email == customer.Email).Any();
            return isExist;

        }

        public User CurrentUser()
        {
            string? currentUserEmail = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Email)?.Value;
            if (currentUserEmail == null)
                return null;
            return GetUserByEmail(currentUserEmail);
        }

        #region Password Related Methods

        public bool ChangePassword(int customerId, string oldPassword, string newPassword)
        {
            User customer = GetUserById(customerId);
            if (customer == null)
            {
                return false;
            }
            if (PasswordValidator.CheckStrength(newPassword) < PasswordScore.Medium)
            {
                return false;
            }

            if (customer.Password != oldPassword.Trim())
            {
                return false;
            }
            customer.Password = newPassword;
            try
            {
                _dbContext.User.Update(customer);
                _dbContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                ExWriter.Write(ex);
                return false;
            }
           
        }

        public bool CheckSellerCertification(int userId)
        {
            if (userId == 0)
            {
                return false;
            }
            var seller = _dbContext.User.Where(x => x.Id == userId).Select(a => a).FirstOrDefault();
            if (seller.Certification == null)
            {
                return false;
            }
            Certificate sellercerti = seller.Certification;

            var certificate = _dbContext.Certificate.Where(x => x.Id == sellercerti.Id);
            return true;
        }

        #endregion
    }

}

