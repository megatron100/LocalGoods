using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public AuthController(LocalGoodsDbContext _localgoodsdbcontext, IConfiguration configuration)
        {
            localgoodsdbcontext = _localgoodsdbcontext;
            _configuration = configuration;
        }
        [HttpPost("Registration")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Register([FromBody] RegistrationModel request)
        {
            ResponseModel response = new ResponseModel();
            try
            {

                var customer = await localgoodsdbcontext.User.Where(x => x.Email == request.Email).FirstOrDefaultAsync();
                if (customer != null)
                {
                    response.Status = false;
                    response.Message = "User Already exists";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                if (request.Password != request.RePassword)
                {
                    response.Status = false;
                    response.Message = "Password Mismatch";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                User _user = new User()
                {
                    CreatedDate = DateTime.UtcNow,
                    Name = request.Name,
                    Email = request.Email,
                    Password = request.Password,
                    Role = request.Role
                };

                var result = await localgoodsdbcontext.User.AddAsync(_user);
                
                 

                localgoodsdbcontext.SaveChanges();
                response.Data = _user;
                 
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
        [AllowAnonymous]
        public async Task<ActionResult<string>> Login([FromBody] LoginModel request)
        {
            try
            {

                ResponseModel response = new ResponseModel();
                var customer = await localgoodsdbcontext.User.Where(x => x.Email == request.Email).FirstOrDefaultAsync();
                if (customer == null)
                {
                    response.Status = false;
                    response.Message = "User Does Not Exists";
                    return StatusCode(StatusCodes.Status401Unauthorized,response);
                }
                bool validatepassword = customer.Password == request.Password;
                if (!validatepassword)
                {
                    response.Status = false;
                    response.Message = "Incorrect Password";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                var authClaims = new List<Claim> 
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Role, customer.Role),
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
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        
        [HttpGet("GetHello")]
        [Authorize(Roles ="seller")]
        public string Get()
        {
            return "Login Successfull..";
        }

    }
}

