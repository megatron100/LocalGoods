using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =Role.Customer)]
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

        private CartResponse PrepareCart(List<ShoppingCartItem> cartItem)
        {
            CartResponse response = new CartResponse();
            foreach(var item in cartItem)
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
            
            var cartItems =await _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id).ToListAsync();
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

        [HttpPost("AddToCart/{ProductId:int}")]
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
            //check if product is already in cart
            
            var cartItem = await _dbContext.ShoppingCartItem.Where(x => x.Product.Id == ProductId && x.User.Id == user.Id).FirstOrDefaultAsync();

            if (cartItem != null)
            {
                cartItem.Quantity += 1;

                _dbContext.ShoppingCartItem.Update(cartItem);

            }
            else
            {

                cartItem = new ShoppingCartItem
                {
                    Product = product,
                    User = user,
                    Quantity = 1,

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

        [HttpDelete("remove/{CartItemId:int}")]
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
