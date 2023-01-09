namespace LocalGoods.Service.Services.IServices
{
    public interface ISecretService
    {
        public string GetDbConnectionString();
        public string GetBlobStorageConnectionString();
        


    }
}
