using LocalGoods.Common.Helpers.Constants;
using LocalGoods.DAL;
using LocalGoods.Common.EfModels;
using LocalGoods.Main.Model.BussinessModels; using LocalGoods.Common.Helpers.Constants;
 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocalGoods.Services.IServices;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Role.Customer)]
    public class CartController : ControllerBase
    {
        //dbcontext
        private LocalGoodsDbContext _dbContext;
        private IUserService _userService;
        public CartController(LocalGoodsDbContext dbContext, IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        private CartResponse PrepareCart(List<ShoppingCartItem> cartItem)
        {
            CartResponse response = new CartResponse();
            foreach (var item in cartItem)
            {
                item.User = null;

            }
            response.cartItems = cartItem;

            response.TotalAmount = cartItem.Sum(x => x.Product.Price * x.Quantity);
            response.TotalQuantity = cartItem.Sum(x => x.Quantity);
            return response;
        }
        [HttpGet("CartItems")]
        public async Task<ActionResult> GetCart()
        {
            var user = _userService.CurrentUser();

            var cartItems = await _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id).ToListAsync();
            //   var cart = _dbContext.ShoppingCart.FirstOrDefault();

            if (cartItems == null)
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
                Data = PrepareCart(cartItems)
            });

        }

        [HttpPost("AddToCart")]
        public async Task<ActionResult> AddProductToCart(AddToCart request)
            
        {
            var user = _userService.CurrentUser();
            var product = await _dbContext.Product.Where(x => x.Id == request.id && x.IsAvailable && x.IsPublished).FirstOrDefaultAsync();
            if (product == null)
            {
                return BadRequest(new ResponseModel
                {
                    Status = false,
                    Message = "Product Not found"
                });
            }
            //check if product is already in cart

            var cartItem = await _dbContext.ShoppingCartItem.Where(x => x.Product.Id == request.id && x.User.Id == user.Id).FirstOrDefaultAsync();

            if (cartItem != null)
            {
                cartItem.Quantity += request.quantity;
                cartItem.TotalAmount = cartItem.Product.Price * cartItem.Quantity;

                _dbContext.ShoppingCartItem.Update(cartItem);

            }
            else
            {

                cartItem = new ShoppingCartItem
                {
                    Product = product,
                    User = user,
                    Quantity = request.quantity

                };
                cartItem.TotalAmount = product.Price * cartItem.Quantity;
                _dbContext.ShoppingCartItem.Add(cartItem);

            }

            _dbContext.SaveChanges();
            var cart = _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id).ToList();

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Product Added to Cart",
                Data = PrepareCart(cart)
            });

        }
        [HttpDelete("minus/{id:int}")]
        
         public async Task<ActionResult> MinusProductToCart(int id)
        {
            var user = _userService.CurrentUser();
            var product = await _dbContext.Product.Where(x => x.Id == id && x.IsAvailable && x.IsPublished).FirstOrDefaultAsync();
            if (product == null)
            {
                return BadRequest(new ResponseModel
                {
                    Status = false,
                    Message = "Product Not found"
                });
            }
            //check if product is already in cart

            var cartItem = await _dbContext.ShoppingCartItem.Where(x => x.Product.Id == id && x.User.Id == user.Id).FirstOrDefaultAsync();

            if (cartItem != null)
            {
            if(cartItem.Quantity==1)
            {
            _dbContext.ShoppingCartItem.Remove(cartItem);
            _dbContext.SaveChanges();

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Cart Item removed from Cart",
                
            });
            
            }
                cartItem.Quantity -= 1;
                cartItem.TotalAmount = product.Price * cartItem.Quantity;

                _dbContext.ShoppingCartItem.Update(cartItem);

            }
            else
            {
                return Ok(
                    new ResponseModel
                    {
                        Status = false,
                        Message = "Product Not found in cart"
                    }
                    );
            }

            _dbContext.SaveChanges();

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Unit item removed from Cart",
                
            });
            
        }

    [HttpDelete("Remove/{CartItemId:int}")]
    public async Task<ActionResult> DeleteProductFromCart(int CartItemId)
    {
        var user = _userService.CurrentUser();
        var cartItem = await _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id && x.Id == CartItemId).FirstOrDefaultAsync();
        if (cartItem == null)
        {
            return BadRequest(new ResponseModel
            {
                Status = false,
                Message = "Cart Item Not found"

            });
        }

        _dbContext.ShoppingCartItem.Remove(cartItem);

        _dbContext.SaveChanges();
        var cart = _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id).ToList();

        return Ok(new ResponseModel
        {
            Status = true,
            Message = "Product Removed from Cart",
            Data = PrepareCart(cart)
        });
    }

    [HttpDelete("ClearCart")]
    public async Task<ActionResult> DeleteCart()
    {
        var customer = _userService.CurrentUser();
        var cartItems = await _dbContext.ShoppingCartItem.Where(x => x.User.Id == customer.Id).ToListAsync();
        if (cartItems == null)
        {
            return Ok(new ResponseModel
            {
                Status = false,
                Message = "Cart is Already Empty"
            });
        }
        _dbContext.ShoppingCartItem.RemoveRange(cartItems);
        _dbContext.SaveChanges();

        return Ok(new ResponseModel
        {
            Status = true,
            Message = "Cart is Empty"

        });

    }

}
}
