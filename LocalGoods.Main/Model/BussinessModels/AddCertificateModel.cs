using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model.BussinessModels
{
    public class AddCertificateModel
    {
        [Required]
        public string QualityCertificateTitle { get; set; }
        [Required]
        public string? QualityCertificateDescription { get; set; }
        [Required]
        public string? QualityCertificateLink { get; set; }
        [Required]
        public string? QualityCertificateDeleteLink { get; set; }
        [Required]
        public string TaxNumber { get; set; }
    }
}
