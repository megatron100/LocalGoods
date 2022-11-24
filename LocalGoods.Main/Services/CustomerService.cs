using LocalGoods.Main.DAL;
using LocalGoods.Main.Infrastructure;
using LocalGoods.Main.Model;

namespace LocalGoods.Main.Services
{
    public class CustomerService
    {
        private readonly LocalGoodsDbContext _dbContext;
        public CustomerService(LocalGoodsDbContext context)
        {
            _dbContext = context;
        }

        public Customer GetCustomerById(int id)
        {

            Customer customer = _dbContext.Customer.Where(x => x.Id == id).FirstOrDefault();
            if (customer == null)
            {
                return null;
            }
            return customer;

        }

        public Customer GetCustomerByEmail(string email)
        {
            if (EmailValidator.Validate(email))
            {
                Customer customer = _dbContext.Customer.Where(x => x.Email == email).FirstOrDefault();
                if (customer != null)
                {
                    return customer;
                }
            }

            return null;
        }

        public bool ValidateCustomer(Customer customer)
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
            bool isExist = _dbContext.Customer.Where(x => x.Email == customer.Email).Any();
            return isExist;

        }

        #region Password Related Methods

        public bool ChangePassword(int customerId, string oldPassword, string newPassword)
        {
            Customer customer = GetCustomerById(customerId);
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
                _dbContext.Customer.Update(customer);
                _dbContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                ExWriter.Write(ex);
                return false;
            }
           
        }

        #endregion
    }

}

