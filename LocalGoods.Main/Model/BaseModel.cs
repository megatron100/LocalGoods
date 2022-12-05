using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LocalGoods.Main.Model
{
    public class BaseModel
    {
        [Key]
      
        public int Id { get; set; }
        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
        
        public BaseModel()
        {
            this.CreatedDate = DateTime.UtcNow;
        }

    }
}
