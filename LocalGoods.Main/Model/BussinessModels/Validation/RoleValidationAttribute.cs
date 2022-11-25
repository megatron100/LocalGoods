using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels.Validation
{
    public class RoleValidationAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {

            if (value.ToString() == "customer" || value.ToString() == "seller")
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("Role can be either 'customer' or 'seller'");
        }
    }
}
