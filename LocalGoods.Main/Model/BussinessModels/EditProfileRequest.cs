using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
{
    public class EditProfileRequest
    {
        
        public string Name { get; set; }
        [StringLength(12, ErrorMessage = "Give 10 digit for mobile Number", MinimumLength =10)]
        public string MobileNum { get; set; }
    }
}
