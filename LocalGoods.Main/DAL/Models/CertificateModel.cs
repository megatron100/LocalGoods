using LocalGoods.Main.DAL.Models;

namespace LocalGoods.Main.DAL.Models
{
    public class Certificate:BaseModel
    {
        public string QualityCertificateTitle { get; set; }
        public string? QualityCertificateDescription { get; set; }
        public string? QualityCertificateLink { get; set; }
        public string? QualityCertificateDeleteLink { get; set; }
        public string TaxNumber { get; set; }   
          
    }
}
