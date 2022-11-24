using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using Microsoft.AspNetCore.Mvc;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public LocalGoodsDbContext dbContext;

        public AuthController(LocalGoodsDbContext _localgoodsdbcontext)
        {
            dbContext = _localgoodsdbcontext;
        }
        [HttpPost("Registration")]
        public async Task<ActionResult<Customer>> Register([FromBody] RegistrationModel request)
        {
            try
            {
                
                Customer _customer = new Customer();
                ResponseModel response = new ResponseModel();

                var customer = dbContext.Customer.Where(x => x.Email == request.Email).FirstOrDefault();
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
                await dbContext.Customer.AddAsync(_customer);
                dbContext.SaveChanges();
                response.Data = _customer;
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
                var customer=dbContext.Customer.Where(x => x.Email == request.Email).FirstOrDefault();
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
            catch (Exception ex)
            {
                 
                throw;
            }
        }

    }
}

