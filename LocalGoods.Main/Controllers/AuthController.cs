using Castle.Core.Internal;
using Castle.Core.Resource;
using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Model.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public LocalGoodsDbContext localgoodsdbcontext;

        public AuthController(LocalGoodsDbContext _localgoodsdbcontext)
        {
            localgoodsdbcontext = _localgoodsdbcontext;
        }
        [HttpPost("Register")]
        public async Task<ActionResult<Customer>> Register([FromBody] RegistrationModel request)
        {
            try
            {
                
                Customer _customer = new Customer();
                ResponseModel response = new ResponseModel();

                var customer = localgoodsdbcontext.Customer.Where(x => x.Email == request.Email).FirstOrDefault();
                if(customer != null)
                {
                    response.Status = false;
                    response.Message = "User Already exists.";
                    return StatusCode(401, response);
                }
                if (request.Password != request.RePassword)
                {
                    response.Status = false;
                    response.Message = "Password Mismatch.";
                    return StatusCode(401,response);
                }
                
                _customer.CreatedDate = DateTime.UtcNow;
                _customer.Name = request.Name;
                _customer.Email = request.Email;
                _customer.Password = request.Password;
                await localgoodsdbcontext.Customer.AddAsync(_customer);
                localgoodsdbcontext.SaveChanges();
                response.BaseModel = _customer;
                response.Status = true;
                response.Message = "Registration Success";
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("Login")]
        public ActionResult<Customer> Login([FromBody] LoginModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var customer=localgoodsdbcontext.Customer.Where(x => x.Email == request.Email).FirstOrDefault();
                if(customer==null)
                {
                    response.Status = false;
                    response.Message = "User Does Not Exists";
                    return BadRequest(response);
                }
                bool validatepassword=customer.Password==request.Password;
                if(validatepassword)
                {
                    response.Status = true;
                    response.Message = "Login Success";
                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.Message = "Incorrect Password";
                    return StatusCode(401,response);
                }
            
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}


