using LocalGoods.Common.EfModels;

namespace LocalGoods.Services.IServices
{
    public interface IUserService
    {
        //generate methods

        User GetUserById(int id);
        Product GetProductById(int id);
        User GetUserByEmail(string email);
        bool ValidateUser(User customer);
        public User CurrentUser();
        public bool ChangePassword(int customerId, string oldPassword, string newPassword);
        public bool CheckSellerCertification(int userId);

    }
}
