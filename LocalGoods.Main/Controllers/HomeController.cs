using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "customer")]
    public class HomeController : ControllerBase
    {
        private readonly LocalGoodsDbContext _dbContext;
        private readonly UserService _userService;

        public HomeController(LocalGoodsDbContext dbContext, UserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProductList()
        {
            var response = new ResponseModel();
            var products = _dbContext.Product.Where(x => x.IsPublished && x.IsAvailable && x.User.Role == Role.Seller).Select(y => y).ToList();
            if (products == null)
            {
                response.Status = false;
                response.Message = "No product available for sale";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }

            var user = _userService.CurrentUser();
            List<Product> nearByProduct = new List<Product>();
            if (user.Address != null)
            {
                nearByProduct = products.Where(x => x.User.Address.City == user.Address.City).Select(a => a).ToList();
            }
            var otherProducts = products.Except(nearByProduct).ToList();
            response.Status = true;
            response.Message = "Products found";
            response.Data = new { nearByProduct, otherProducts };
            return Ok(response);

        }
        [HttpGet("GetProductById")]
        public async Task<IActionResult> GetProduct(int id)
        {

            var response = new ResponseModel();

            var product = _dbContext.Product.Where(x => x.Id == id).Select(y => y).FirstOrDefault();
            if (product == null)
            {
                response.Status = false;
                response.Message = "Product not found";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            response.Status = true;
            response.Message = "Product found";
            product.User.Password = "";
            response.Data = product;
            return Ok(response);
        }
        [HttpGet("Sellers")]

        public async Task<ActionResult> GetSellers()
        {
            var Sellerlist = await _dbContext.User.Where(x => x.Role == Role.Seller).ToListAsync();
            if (Sellerlist == null || Sellerlist.Count == 0)
            {
                return Ok(new ResponseModel
                {
                    Status = false,
                    Message = "No seller Found"

                });
            }
            foreach (var seller in Sellerlist)
            {
                seller.Password = "";
            }

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Sellers Found",
                Data = Sellerlist
            });

        }

    }

}

