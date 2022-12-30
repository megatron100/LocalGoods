using LocalGoods.Common.Helpers.Constants;
using LocalGoods.DAL;
using LocalGoods.Common.EfModels;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Common.Helpers.Constants;
 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocalGoods.Services;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Role.Customer)]
    public class OrderController : ControllerBase
    {
        private LocalGoodsDbContext _dbContext;
        private UserService _customerService;
        public OrderController(LocalGoodsDbContext localGoodsDbContext, UserService customerService)
        {
            _dbContext = localGoodsDbContext;
            _customerService = customerService;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult> GetOrders()
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var user = _customerService.CurrentUser();

                var order = await _dbContext.Orders.Where(x => x.Customer.Id == user.Id).Select(y => y).ToListAsync();
                if (order.Count == 0)
                {
                    return Ok(new ResponseModel
                    {
                        Status = false,
                        Message = "No Order Found"
                    });
                }
                foreach (var item in order)
                {
                    item.Customer = null;

                }
                response.Status = true;
                response.Data = order;
                response.Message = "Order Found Successfully...";
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }                               
        }

        [HttpGet("GetOrderById/{id:int}")]
        public async Task<ActionResult> GetOrderById(int id)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var user = _customerService.CurrentUser();
                var order = await _dbContext.Orders.Where(x => x.Customer.Id == user.Id && x.Id == id).Select(y => y).FirstOrDefaultAsync();
                if (order == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                order.Customer = null;
                response.Status = true;
                response.Data = order;
                response.Message = "Order Found Successfully...";
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("orderfromcart")]
        public async Task<ActionResult> OrderFromCart()
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var user = _customerService.CurrentUser();
                var cartItems = await _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id).Select(a => a).ToListAsync();
                if (cartItems.Count == 0)
                {
                    return BadRequest(new ResponseModel
                    {
                        Status = false,
                        Message = "No product found in Cart"
                    });
                }
                if(user.Address==null)
                {
                    response.Status = false;
                    response.Message = "You don't have any address, Please add the address first";
                        return Ok(response);
                }
                //put all cart items in order

                foreach (var item in cartItems)
                {
                    Order order = new Order();
                    order.OrderItem = item.Product;
                    order.OrderStatus = OrderStatus.Pending;
                    order.OrderDate = DateTime.UtcNow;
                    order.Customer = user;
                    order.PaymentType = "card";
                    order.DropAddress = user.Address;
                    order.Quantity = item.Quantity;
                    order.TotalPrice = item.TotalAmount;
                   
                    await _dbContext.Orders.AddAsync(order);

                }
                //clear the cart
                _dbContext.ShoppingCartItem.RemoveRange(cartItems);
                await _dbContext.SaveChangesAsync();
                return Ok(new ResponseModel
                {

                    Status = true,
                    Message = "Order Placed Successfully"

                });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost("Pay")]
        public async Task<ActionResult> Pay(PaymentRequest request)
        {
            try
            {
                var user = _customerService.CurrentUser();
                //check if card is valid

                var isCardValid = _dbContext.CardDetails.Where(x => x.Id == request.CardId).Any();
                if (!isCardValid)
                {
                    return BadRequest(new ResponseModel
                    {
                        Status = false,
                        Message = "Card is not valid"
                    });
                }

                //check if Order is valid
                var cartItems =   _dbContext.ShoppingCartItem.Where(x => x.User.Id == user.Id).Select(a => a).ToList();
                if(cartItems.Count==0)
                {
                    return BadRequest(new ResponseModel
                    {
                        Status = false,
                        Message = "No product found in Cart"
                    });
                }

                //Total price of cart items
                decimal totalPrice = 0;
                foreach(var item in cartItems)
                {
                    totalPrice += item.TotalAmount;
                }

                //Do Payment
                var isSuccessFul = true;
                if(!isSuccessFul)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return RedirectToAction("OrderFromCart", "Order");
            }
            
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
