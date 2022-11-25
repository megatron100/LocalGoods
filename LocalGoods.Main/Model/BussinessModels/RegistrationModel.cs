using LocalGoods.Main.Model.BussinessModels.Validation;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
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

        //if not set anything we'll assume it's customer,  set "seller" for Seller, set "customer" for customer
        [Required]
        [RoleValidation]
        public string? Role { get; set; } = "customer";
    }
}
