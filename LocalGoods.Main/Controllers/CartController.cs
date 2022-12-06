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
        public async Task<ActionResult> AddProductToCart(int ProductId)

        {
            var user = _userService.CurrentUser();
            var product = await _dbContext.Product.Where(x => x.Id == ProductId && x.IsAvailable && x.IsPublished).FirstOrDefaultAsync();
            if (product == null)
            {
                return BadRequest(new ResponseModel
                {
                    Status = false,
                    Message = "Product Not found"
                });
            }
            //check if cart is null?
            var cart = _dbContext.ShoppingCart.Where(x => x.UserId == user.Id).LastOrDefault();
            if(cart==null)
            {
                cart = new ShoppingCart
                {

                    UserId = user.Id,
                    CartProducts = new List<ShoppingCartItem>()
                   
                };
                _dbContext.ShoppingCart.Add(cart);
                _dbContext.SaveChanges();
            }
            //if product already in cart
            var cartItem = cart.CartProducts.LastOrDefault(x => x.Product.Id == ProductId);
            if (cartItem != null)
            {
                cart.CartProducts.Remove(cartItem);
                cartItem.Quantity++;
                _dbContext.ShoppingCartItem.Update(cartItem);
                cart.CartProducts.Add(cartItem);
                _dbContext.ShoppingCart.Update(cart);
            }
            //if not in cart then
            else
            {
                cartItem = new ShoppingCartItem
                {
                    UserId = user.Id,
                    Product = product,
                    Quantity = 1

                };
                _dbContext.ShoppingCartItem.Add(cartItem);
                cart.CartProducts.Add(cartItem);
                _dbContext.ShoppingCart.Update(cart);
            }
            _dbContext.SaveChanges();
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Product Added to Cart",
                Data = cart
            });

        }

        [HttpDelete("remove")]
        public async Task<ActionResult> DeleteProductFromCart(int CartItemId)
        {
            var user = _userService.CurrentUser();
            var cart = await _dbContext.ShoppingCart.Where(x => x.UserId == user.Id).Select(a => a).LastOrDefaultAsync();
            if (cart == null)
            {
                cart = new ShoppingCart
                {

                    UserId = user.Id,
                    CartProducts = new List<ShoppingCartItem>()

                };
                _dbContext.ShoppingCart.Add(cart);
                _dbContext.SaveChanges();
            }
            var cartItem = cart.CartProducts.LastOrDefault(x => x.Id == CartItemId);
            if (cartItem == null)
            {
                return BadRequest(new ResponseModel
                {
                    Status = false,
                    Message = "Cart Item Not found"
                    
                });
            }
             cart.CartProducts.Remove(cartItem);
            _dbContext.ShoppingCartItem.Remove(cartItem);
            _dbContext.ShoppingCart.Update(cart);
            _dbContext.SaveChanges();
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Product Removed from Cart",
                Data = cart
            });
        }

    }
}
