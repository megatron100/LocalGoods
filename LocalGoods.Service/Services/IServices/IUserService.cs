using LocalGoods.Common.EfModels;

namespace LocalGoods.Services.IServices
{
    public interface IUserService
    {
        //generate methods

        User GetUserById(int id);
        Product GetProductById(int id);

        Task<bool> AddUser(User user);
        Task<bool> UpdateUser(User user);
        
        User GetUserByEmail(string email);
        bool ValidateUser(User customer);
        public User CurrentUser();
        public bool ChangePassword(int customerId, string oldPassword, string newPassword);
        public bool CheckSellerCertification(int userId);

        //seller
        public Task<List<User>> GetAllSellers();
        public Task<bool> RateSeller(int sellerId, int rating);

        //admin related methods
        public Task<List<User>> AdminGetAllUsers();
     
        public Task<List<User>> AdminGetAllBlockedUsers();
        public Task<bool> AdminBlockUser(int userId);
        public Task<bool> AdminUnblockUser(int userId);
        public Task<bool> AdminDeleteUser(int userId);

    }
}
