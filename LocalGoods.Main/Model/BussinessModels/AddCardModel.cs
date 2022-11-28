using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
{
    public class AddCardModel
    {
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public string Expiry { get; set; }
        [Required]
        public string CardProvider { get; set; }
    }
}
