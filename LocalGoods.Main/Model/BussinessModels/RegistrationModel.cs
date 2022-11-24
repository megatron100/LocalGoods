using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.DTO
{
    public class RegistrationModel
    {
        [Required]
        public string Name { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        [Required,PasswordPropertyText]
        public string Password { get; set; }
        [Required,PasswordPropertyText]
        public string RePassword { get; set; }
    }
}
