namespace LocalGoods.Main.Model.DTO
{
    public class ResponseModel
    {
        public int ResponseId { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }

        public object BaseModel { get; set; }
    }
}
