 
using System.ComponentModel.DataAnnotations.Schema;

namespace LocalGoods.Common.EfModels
{
    public class ShoppingCartItem : BaseModel
    {

        public virtual Product Product { get; set; }
         
        public virtual User? User { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalAmount
        {

            get;set;
        }

    }
}
