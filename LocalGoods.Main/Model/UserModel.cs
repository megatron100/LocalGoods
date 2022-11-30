using LocalGoods.Main.Model.BussinessModels.Validation;
using System.Text.Json.Serialization;

namespace LocalGoods.Main.Model
{
    public class User :BaseModel
    {
  
        public string Email { get; set; }
        [JsonIgnore]
        
        public string Password { get; set; }

        public string Name { get; set; }
        public string? Mobile { get; set; }

        public virtual Address? Address { get; set; } 

        public virtual  List<CardDetail>? CardList { get; set; }
        [RoleValidation]
        public string Role { get; set; } = "customer";

        public virtual Certificate? Certification { get; set; }
        public int SellerRating { get; set; } = 0;

    }
}
