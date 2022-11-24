namespace LocalGoods.Main.Model.BussinessModels
{
    public class ResponseModel
    {
        public int ResponseId { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }

        public object Data { get; set; }
    }
}
