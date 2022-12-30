using LocalGoods.DAL;
using LocalGoods.Common.EfModels;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Common.Helpers.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using LocalGoods.Common.Helpers.Constants;

namespace LocalGoods.Main.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class CommonController : ControllerBase
    {
        private readonly LocalGoodsDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public CommonController(LocalGoodsDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }
        [HttpGet("Categories")]
        public async Task<ActionResult> GetCategory()
        {
            var catogory = _dbContext.ProductCategory.Select(a => a).ToList();
            if (catogory.Any())
            {
                return Ok(new ResponseModel
                {
                    Status = true,
                    Message = "Categories Found",
                    Data = catogory

                });

            }
            return NotFound(new ResponseModel
            {
                Status = false,
                Message = "No Categories Found/ Bad Request",

            });
        }
        [Authorize(Roles = Role.Seller)]
        [HttpPost("AddCategory")]
        public async Task<ActionResult> AddCategory([FromBody] CategoryRequest request)
        {
            var response = new ResponseModel();
            if (string.IsNullOrEmpty(request.CategoryName))
            {
                return BadRequest(
                    new ResponseModel
                    {
                        Status = false,
                        Message = "Category Name is Invalid"
                    }
                    );
            }

            var category = new ProductCategory
            {
                ProductCategoryName = request.CategoryName
            };
            await _dbContext.ProductCategory.AddAsync(category);
            await _dbContext.SaveChangesAsync();
            response.Status = true;
            response.Message = "Category Added";
            response.Data = category;
            return Ok(response);
        }
        [HttpDelete("deletecategory")]

        public async Task<ActionResult> DeleteCategory(int id)
        {
            var response = new ResponseModel();
            var category = _dbContext.ProductCategory.FirstOrDefault(a => a.Id == id);
            if (category is null)
            {

                response.Status = false;
                response.Message = "Category Not Found";
                return NotFound(response);

            }
            _dbContext.ProductCategory.Remove(category);
            await _dbContext.SaveChangesAsync();
            response.Status = true;
            response.Message = "Category Deleted";
            response.Data = category;
            return Ok(response);
        }
        [HttpPost("Upload")]
        public async Task<ActionResult> SaveImage(IFormFile file)
        {
            var response = new ResponseModel();
            //check if file is image
            if (!file.ContentType.Contains("image"))
            {
                response.Status = false;
                response.Message = "File is not an image";
                return BadRequest(response);
            }
            //check if file is empty
            if (file.Length == 0)
            {
                response.Status = false;
                response.Message = "File is empty";
                return BadRequest(response);
            }

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var connectionString = _configuration.GetConnectionString("AzureStorage");
            var blobServiceClient = new BlobServiceClient(connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient("productimage");
            //create a container if it doesn't exist
            await containerClient.CreateIfNotExistsAsync();
            
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(file.OpenReadStream());
            var url = blobClient.Uri.AbsoluteUri;

            response.Status = true;
            response.Message = "Image Uploaded";
            response.Data = url;
            return Ok(response);
        }

    }
}

