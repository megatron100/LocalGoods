 
using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Main.DAL.Models
{
    public class Product : BaseModel
    {

        public string ProductTitle { get; set; }
         
        public virtual User? Seller { get; set; }
        public virtual ProductCategory ProductCategory { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        public string ShortDescription { get; set; }
        public string? LongDescription { get; set; }

        public string? ImageLink { get; set; }
        public string? DeleteImageLink { get; set; }

        public bool IsPublished { get; set; } = true;           
        public bool IsAvailable { get; set; } = true;
    }

}
        