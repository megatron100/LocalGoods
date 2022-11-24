using Castle.Core.Internal;
using Castle.Core.Resource;
using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Model.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration _configuration;
        public LocalGoodsDbContext localgoodsdbcontext;

        public AuthController(LocalGoodsDbContext _localgoodsdbcontext,IConfiguration configuration)
        {
            localgoodsdbcontext = _localgoodsdbcontext;
            _configuration = configuration;
        }
        [HttpPost("Register")]
        public async Task<ActionResult<Customer>> Register([FromBody] RegistrationModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();

                var customer = localgoodsdbcontext.Customer.Where(x => x.Email == request.Email).FirstOrDefault();
                if(customer != null)
                {
                    response.Status = false;
                    response.Message = "User Already exist.";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                if (request.Password != request.RePassword)
                {
                    response.Status = false;
                    response.Message = "Password Mismatch.";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                Customer _customer = new Customer()
                {
                    CreatedDate = DateTime.UtcNow,
                    Name = request.Name,
                    Email = request.Email,
                    Password = request.Password,
                };
                
                var result=await localgoodsdbcontext.Customer.AddAsync(_customer);
                
                localgoodsdbcontext.SaveChanges();
                response.BaseModel = _customer;
                response.Status = true;
                response.Message = "Registration Success";
                return Ok(response);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("Login")]
        public ActionResult<string> Login([FromBody] LoginModel request)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var customer=localgoodsdbcontext.Customer.Where(x => x.Email == request.Email).FirstOrDefault();
                if(customer==null)
                {
                    response.Status = false;
                    response.Message = "User Does Not Exists";
                    return StatusCode(StatusCodes.Status401Unauthorized);
                }
                bool validatepassword=customer.Password==request.Password;
                if(!validatepassword)
                {
                    response.Status = false;
                    response.Message = "Incorrect Password";
                    return StatusCode(StatusCodes.Status401Unauthorized,response);
                }
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
                var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                    );
                return new JwtSecurityTokenHandler().WriteToken(token);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }   
        }

    }
}


