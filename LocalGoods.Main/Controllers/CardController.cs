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
                    if(user.CardList==null)
                    {
                        user.CardList = new List<CardDetail>();
                    }
                    user.CardList.Add(card);
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

        [HttpGet("GetCards")]
        public ActionResult<IEnumerable<CardDetail>> GetCards()
        {
            User curuser =_customerService.CurrentUser();
            if (curuser.CardList == null)
            {
                curuser.CardList = new List<CardDetail>();
            }
            List<CardDetail> cards = curuser.CardList;
            if(cards.Count==0)
            {
            
                return BadRequest(new { Message = "User Has no Card.." });
            }
            return Ok(cards);            
        }
        [HttpDelete("RemoveCard")]
        public async Task<ActionResult<ResponseModel>> RemovePaymentCard(int id)
        {
            var curuser = _customerService.CurrentUser();
            var card = _dbContext.CardDetails.Where(x => x.Id == id).FirstOrDefault();
            if (card == null)
            {
                return NotFound($"Productwith Id = {id} not found");
            }
            _dbContext.CardDetails.Remove(card);
            await _dbContext.SaveChangesAsync();
            return Ok(new { Message = "Card Deleted Successfully.." });
        }
    }
}
