namespace LocalGoods.Main.Model
{
    public class Seller :Customer
    {
         public virtual Certificate Certification { get; set; }
         public int SellerRating { get; set; }
    }
}
