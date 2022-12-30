using LocalGoods.Service.Services.IServices;

namespace LocalGoods.Service.Services
{
    public class StorageService : IStorageService
    {
        public Task<bool> DeleteFile(string Url)
        {
            throw new NotImplementedException();
        }

        public Task<string> SaveFile(string Container, IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<string> UpdateFile(string Url)
        {
            throw new NotImplementedException();
        }
    }
}
