namespace LocalGoods.Main.Model
{
    public class Product : BaseModel
    {

   public string ProductTitle { get; set; }
   public virtual Seller Seller { get; set; }
    public virtual ProductCategory ProductCategory { get; set; }
    public decimal Price { get; set; }
    public string ShortDescription { get; set; }
    public string? LongDescription { get; set; }


        public bool IsPublished { get; set; } = true;
        public bool IsAvailable { get; set; } = true;
}

    
}
