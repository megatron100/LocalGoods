using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using LocalGoods.Main.DAL;
using LocalGoods.Main.Services;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        
        private LocalGoodsDbContext _dbContext;
        private UserService _customerService;

        public CardController
            (
            LocalGoodsDbContext _localgoodsdbcontext,
            UserService customerService
            )
        {
            _dbContext = _localgoodsdbcontext;
            _customerService = customerService;

        }
        [HttpPost("AddCard")]
        public async Task<ActionResult<ResponseModel>> AddPaymentCard([FromBody] AddCardModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var user = _customerService.CurrentUser();
                
                if (user == null )
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                 
                    CardDetail card = new CardDetail()
                    {
                        CardProvider = request.CardProvider,
                        Expiry = request.Expiry,
                        CardNumber = request.CardNumber

                    };
                   
                        user.Card = new CardDetail();
              
                    user.Card=card;
                    await _dbContext.CardDetails.AddAsync(card);
                    _dbContext.User.Update(user);
                    _dbContext.SaveChanges();
                
                    response.Status = true;
                    response.Data = card;
                    response.Message = "Card Added Successfully...";

                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("GetCard")]
        public ActionResult<IEnumerable<CardDetail>> GetCard()
        {
            User curuser =_customerService.CurrentUser();
            if (curuser.Card == null)
            {
                return Ok(new ResponseModel
                { 
                    Status = false,
                    Message = "No Card Found"
                  
            });

            }
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Card Found",
                Data = curuser.Card
            });

        }
        [HttpDelete("RemoveCard")]
        public async Task<ActionResult<ResponseModel>> RemovePaymentCard()
        {
            var curuser = _customerService.CurrentUser();
             
            if (curuser.Card == null)
            {
                return NotFound($"Cart not found");
            }
              curuser.Card = null;
            
            _dbContext.CardDetails.Remove(curuser.Card);
            _dbContext.User.Update(curuser);
            _dbContext.SaveChangesAsync();
            return Ok(new { Message = "Card Deleted Successfully.." });
        }
    }
}
