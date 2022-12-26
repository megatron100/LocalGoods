using RoleNameSpace = LocalGoods.Main.DAL.Helpers.Constants;
using LocalGoods.Main.DAL.Helpers.Attributes;
using System.Text.Json.Serialization;

namespace LocalGoods.Main.DAL.Models
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
        public string Role { get; set; } =  RoleNameSpace.Role.Customer;

        public virtual Certificate? Certification { get; set; }
        public double SellerRating { get; set; } = 0;

    }
}
