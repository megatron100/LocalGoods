namespace LocalGoods.Main.Model
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
