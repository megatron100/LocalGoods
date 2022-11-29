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
        [HttpPost("AddPaymentCard")]
        public async Task<ActionResult<ResponseModel>> AddPaymentCard([FromBody] AddCardModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var curuseremail = _customerService.CurrentUser().Email;
                var seller = _dbContext.User.Where(x => x.Email == curuseremail).FirstOrDefault();
                if (curuseremail == null || seller == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                else
                {
                    CardDetail card = new CardDetail()
                    {
                        CardProvider = request.CardProvider,
                        Expiry = request.Expiry,
                        CardNumber = request.CardNumber

                    };
                    if(seller.CardList==null)
                    {
                        seller.CardList = new List<CardDetail>();
                    }
                    seller.CardList.Add(card);
                    var result = await _dbContext.CardDetails.AddAsync(card);
                    _dbContext.SaveChanges();

                    response.Status = true;
                    response.Data = card;
                    response.Message = "Card Added Successfully...";

                }

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
        [HttpDelete("RemovePaymentCard")]
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
