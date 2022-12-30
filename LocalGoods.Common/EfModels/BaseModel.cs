using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LocalGoods.Common.EfModels
{
    public class BaseModel
    {
        [Key]

        public int Id { get; set; }
        [JsonIgnore]
        public DateTime CreatedDate { get; set; }

        public BaseModel()
        {
            CreatedDate = DateTime.UtcNow;
        }

    }
}
