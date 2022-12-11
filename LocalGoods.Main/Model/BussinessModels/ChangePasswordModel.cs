using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
{
    public class ChangePasswordModel
    {
        
        [Required,PasswordPropertyText]
        public string existingPassword { get; set; }

        [Required, PasswordPropertyText]
        public string newPassword { get; set; }
        [Required, PasswordPropertyText]
        public string passConfirm { get; set; }
    }
}
