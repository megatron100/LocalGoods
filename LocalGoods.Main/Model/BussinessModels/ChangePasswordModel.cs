using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
{
    public class ChangePasswordModel
    {
        [Required,EmailAddress]
        public string Email { get; set; }
        [Required,PasswordPropertyText]
        public string Password { get; set; }

        [Required, PasswordPropertyText]
        public string ConfirmPassword { get; set; }
    }
}
