using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        //dbcontext
        private LocalGoodsDbContext _dbContext;
        private UserService _userService;
        public CartController(LocalGoodsDbContext dbContext, UserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }
        [HttpGet("CartItems")]
        public async Task<ActionResult> Get()
        {
            var user = _userService.CurrentUser();

            var cart = await _dbContext.ShoppingCart.Where(x => x.UserId == user.Id).Select(a => a).LastOrDefaultAsync();
            if (cart == null)
            {
                return Ok(new ResponseModel
                {
                    Status = false,
                    Message = "No Cart Found"
                });
            }
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Cart Found",
                Data = cart
            });

        }

        [HttpPost("AddToCart")]
        public async Task<ActionResult> AddProductToCart([FromBody] AddProductToCartRequest request)

        {
            var user = _userService.CurrentUser();
            var product = await _dbContext.Product.Where(x => x.Id == request.ProductId && x.IsAvailable && x.IsPublished).FirstOrDefaultAsync();
            if (product == null)
            {
                return BadRequest(new ResponseModel
                {
                    Status = false,
                    Message = "Product Not found"
                });
            }
            ShoppingCartItem item = new ShoppingCartItem
            {
                Product = product,
                Quantity = request.Quantity,

            };
            await _dbContext.ShoppingCartItem.AddAsync(item);

            var cart = await _dbContext.ShoppingCart.Where(x => x.UserId == user.Id).Select(a => a).LastOrDefaultAsync();
            if (cart == null)
            {
                cart = new ShoppingCart();
                cart.CartProducts = new List<ShoppingCartItem>();
                cart.CartProducts.Add(item);
                _dbContext.ShoppingCart.Add(cart);
            }
              cart.CartProducts.Add(item);
            _dbContext.ShoppingCart.Update(cart);
            _dbContext.SaveChangesAsync();

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Product Added to Cart",
                Data = cart
            });
        }
        [HttpDelete("remove")]
        public async Task<ActionResult> DeleteProductFromCart(int ProductId)
        {
            var user = _userService.CurrentUser();
            var product = await _dbContext.Product.Where(x => x.Id == ProductId).FirstOrDefaultAsync();
            if(product==null)
            {
                return BadRequest();
            }

            var cart = await _dbContext.ShoppingCart.Where(x => x.UserId==user.Id && x.CartProducts.Select(a => a.Product).Contains(product)).FirstOrDefaultAsync();
            if(cart==null)
            {
                return BadRequest();
            }
            if(cart.CartProducts==null)
            {
                return BadRequest();
            }
            var cartItem = cart.CartProducts.FirstOrDefault(a => a.Product.Id == ProductId);
            if(cartItem==null)
            {
                return BadRequest();
            }
            cart.CartProducts.Remove(cartItem);
            _dbContext.ShoppingCartItem.Remove(cartItem);

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Product Removed from Cart"

            });
            
        }

    }
}
