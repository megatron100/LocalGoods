using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
{
    [Serializable]
    public class EditProfileRequest
    {
        [Required]
        public AddressChangeRequest2 address { get; set; }
        public Basicinfo basicInfo { get; set; }
       
    }
    public class Basicinfo
    {
        public string Name { get; set; }    
        public string mobile { get; set; }
    }
}
