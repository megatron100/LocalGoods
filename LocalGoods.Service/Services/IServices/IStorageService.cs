namespace LocalGoods.Service.Services.IServices
{
    public interface IStorageService
    {
        //blob storage
        public Task<string> SaveFile(string Container, IFormFile file);
        public Task<string> UpdateFile(string Url);
        public Task<bool> DeleteFile(string Url);

    }
}
