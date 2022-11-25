using LocalGoods.Main.Model.BussinessModels.Validation;

namespace LocalGoods.Main.Model
{
    public class User :BaseModel
    {
  
        public string Email { get; set; }   
        public string Password { get; set; }

        public string Name { get; set; }

        public virtual Address? Address { get; set; } 

        public virtual CardDetail? CardDetail { get; set; }
        [RoleValidation]
        public string Role { get; set; } = "customer";

        public virtual Certificate? Certification { get; set; }
        public int SellerRating { get; set; } = 0;

    }
}
