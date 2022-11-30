using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LocalGoods.Main.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class CommonController : ControllerBase
    {
        private readonly LocalGoodsDbContext _dbContext;
        public CommonController(LocalGoodsDbContext dbContext)
        {
            _dbContext = dbContext;
        }
         [HttpGet("Categories")]
         public async Task<ActionResult> GetCategory()
         {
            var catogory =   _dbContext.ProductCategory.Select(a => a).ToList();
            if (catogory.Any())
            {
                return Ok(new ResponseModel
                {
                    Status = true,
                    Message="Categories Found",
                    Data=catogory

                });
                
            }
            return NotFound(new ResponseModel
            {
                Status = false,
                Message = "No Categories Found/ Bad Request",

            });
         }
        [Authorize(Roles =Role.Seller)]
        [HttpPost("AddCategory")]
        public async Task<ActionResult> AddCategory([FromBody] CategoryRequest request)
        {
            var response = new ResponseModel();
            if(string.IsNullOrEmpty(request.CategoryName))
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

    }
    }

