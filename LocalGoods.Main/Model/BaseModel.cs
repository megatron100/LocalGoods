using System.ComponentModel.DataAnnotations;

namespace LocalGoods.Main.Model
{
    public class BaseModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
