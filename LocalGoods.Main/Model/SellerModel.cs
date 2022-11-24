using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.Model
{
   
    public class Seller:BaseModel
    {

        public string Email { get; set; }
        public string Password { get; set; }

        public string Name { get; set; }

        public virtual Address? Address { get; set; }

        public virtual CardDetail? CardDetail { get; set; } = null;

        public int Role { get; set; } = 1;
        public virtual Certificate? Certification { get; set; }
        public int SellerRating { get; set; } = 0;  
    }
}
