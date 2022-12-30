using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Common.EfModels
{
    public class Address:BaseModel
    {

        [Required]
        public string PinCode { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Area { get; set; }
        
        public string? Cordinates { get; set; } 

    }
}