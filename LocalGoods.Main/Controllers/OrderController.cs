using LocalGoods.Main.DAL;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

                var order = await _dbContext.Orders.Where(x => x.CustomerId == user.Id).Select(y => y).ToListAsync();
                if (order == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
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

        [HttpGet("GetOrderById")]
        public async Task<ActionResult> GetOrderById(int id)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var user = _customerService.CurrentUser();
                var order = await _dbContext.Orders.Where(x => x.CustomerId == user.Id && x.Id == id).Select(y => y).FirstOrDefaultAsync();
                if (order == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
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
        //[HttpPost("OrderFromCart")]
        //public async Task<ActionResult> OrderFromCart([FromBody] Order order)
        //{
        //    try
        //    {
        //        ResponseModel response = new ResponseModel();
        //        var user = _customerService.CurrentUser();
        //        order.CustomerId = user.Id;
        //        order.OrderDate = DateTime.Now;
        //        order.OrderStatus = OrderStatus.Pending;
        //        order.OrderType = OrderType.Cart;
        //        await _dbContext.Orders.AddAsync(order);
        //        await _dbContext.SaveChangesAsync();
        //        response.Status = true;
        //        response.Data = order;
        //        response.Message = "Order Placed Successfully...";
        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError);
        //    }
        //}

    }
}
