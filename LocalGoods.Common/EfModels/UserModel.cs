 
using System.Text.Json.Serialization;
using LocalGoods.Common.Helpers.Attributes;
using role=LocalGoods.Common.Helpers.Constants;

namespace LocalGoods.Common.EfModels
{

    public class User :BaseModel
    {
  
        public string Email { get; set; }
        [JsonIgnore]
        
        public string Password { get; set; }

        public string Name { get; set; }
        public string? Mobile { get; set; }

        public virtual Address? Address { get; set; }

        public virtual  CardDetail? Card { get; set; }
        [RoleValidation]
        public string Role { get; set; } = role.Role.Customer;

        public virtual Certificate? Certification { get; set; }
        public double SellerRating { get; set; } = 0;

    }
}
