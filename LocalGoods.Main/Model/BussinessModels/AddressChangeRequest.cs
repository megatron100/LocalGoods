namespace LocalGoods.Main.Model.BussinessModels
{
    public class AddressChangeRequest
    {
     
        public string PostCode { get; set; }
        
        public string Country { get; set; }
        
        public string City { get; set; }
       
        public string Area { get; set; }

        public string? Cordinates { get; set; }
    }

    public class AddressChangeRequest2
    {

        public string postCode { get; set; }

        public string country { get; set; }

        public string city { get; set; }

        public string area { get; set; }

        public string? Cordinates { get; set; }
    }
}
