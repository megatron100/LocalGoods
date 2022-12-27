
using LocalGoods.Main.Model.BussinessModels;
using Microsoft.AspNetCore.Authentication;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using LocalGoods.Main.Infrastructure.LocalGoods.Main.Infrastructure;
using LocalGoods.Main.Infrastructure;

using LocalGoods.Main.DAL.UnitOfWork;
using User = LocalGoods.Main.DAL.Models.User;
using LocalGoods.Main.DAL;

namespace LocalGoods.Main.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private IUnitOfWork _unitofWork;

        private readonly IJwtAuthManager _jwtAuthManager;

        public AuthController(

            IJwtAuthManager jwtAuthManager,
            IUnitOfWork unitofWork

            )
        {

            _jwtAuthManager = jwtAuthManager;
            _unitofWork = unitofWork;

        }

        [HttpGet("Test")]
        public ActionResult Employee()
        {
            //string[] Employees = new string[] { "Employee1", "Employee2", "Employee3" };

            //get sellers
            var sellers6 = _unitofWork.UserRepository.GetById(1);
            var sellers = _unitofWork.UserRepository.GetAll();
            var sellers2 = _unitofWork.UserRepository.GetAll().ToList();

            var sellers5 = _unitofWork.UserRepository.GetAll().ToList().Where(x => x.Role == Role.Seller);

            return Ok(sellers);

        }

        [HttpPost("Registration")]
        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody] RegistrationModel request)
        {
            ResponseModel response = new ResponseModel();
            try
            {
                if (string.IsNullOrEmpty(request.Name))
                {
                    response.Status = false;
                    response.Message = "Invalid Credentials";
                    return BadRequest(response);
                }
                request.Name = request.Name.ToUpper().Trim();
                request.Email = request.Email.ToLower().Trim();
                request.Password = request.Password.Trim();
                request.RePassword = request.RePassword.Trim();
                request.Role = request.Role.Trim();

                if (!EmailValidator.Validate(request.Email))
                {
                    response.Status = false;
                    response.Message = "Invalid Email";
                    return BadRequest(response);

                }

                //var customer = await localgoodsdbcontext.User.Where(x => x.Email == request.Email).Select(a => a).FirstOrDefaultAsync();
                var customer = _unitofWork.UserRepository.GetAll().Where(x => x.Email == request.Email).Select(a => a).FirstOrDefault();
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

                if (PasswordValidator.CheckStrength(request.Password) < PasswordScore.Medium)

                {
                    response.Status = false;
                    response.Message = "Password is not strong enough";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                User _user = new User()
                {
                    CreatedDate = DateTime.UtcNow,
                    Name = request.Name,
                    Email = request.Email,
                    Password = EncryptPassword.CalculateSHA256(request.Password),
                    Role = request.Role
                };

                var result = await _unitofWork.UserRepository.AddAsync(_user);

                await _unitofWork.SaveAsync();
                response.Data = new
                {
                    Name = request.Name,
                    Email = request.Email,

                    Role = request.Role
                };

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

        public async Task<ActionResult> Login([FromBody] LoginModel request)
        {
            try
            {
                request.Email = request.Email.ToLower().Trim();
                request.Password = request.Password.Trim();
                ResponseModel response = new ResponseModel();
                var customer = _unitofWork.UserRepository.GetAll().Where(x => x.Email == request.Email).Select(a => a).FirstOrDefault();
                if (customer == null)
                {
                    response.Status = false;
                    response.Message = "User Does Not Exists";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }
                bool validatepassword = customer.Password == EncryptPassword.CalculateSHA256(request.Password);
                if (!validatepassword)
                {
                    response.Status = false;
                    response.Message = "Incorrect Password";
                    return StatusCode(StatusCodes.Status401Unauthorized, response);
                }

                //JWT Authentication
                var authClaims = new Claim[]
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Role, customer.Role),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };

                var jwtResult = _jwtAuthManager.GenerateTokens(request.Email, authClaims, DateTime.Now);

                return Ok(new ResponseModel
                {
                    Status = true,
                    Message = "Login Successfull",
                    Data = new
                    {
                        name = customer.Name,
                        email = customer.Email,
                        Role = customer.Role,
                        Id = customer.Id,
                        AccessToken = jwtResult.AccessToken,
                        RefreshToken = jwtResult.RefreshToken.TokenString

                    }
                });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("Logout")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [Authorize]
        public ActionResult Logout()
        {
            // optionally "revoke" JWT token on the server side --> add the current token to a block-list
            // https://github.com/auth0/node-jsonwebtoken/issues/375

            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            _jwtAuthManager.RemoveRefreshTokenByUserEmail(userEmail);

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Logged Out Success. Please visit Login page"

            }
                );

        }

        [HttpPost("RefreshToken")]
        [Authorize]
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {

            try
            {
                var userEmail = User.FindFirstValue(ClaimTypes.Email);

                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {

                    return Unauthorized(new ResponseModel { Status = false, Message = "Invalid refresh token" });
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");

                var jwtResult = _jwtAuthManager.Refresh(request.RefreshToken, accessToken, DateTime.Now);

                return Ok(new ResponseModel
                {
                    Status = true,
                    Message = "Token Refreshed",
                    Data = new
                    {
                        UserRole = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
                        accesstoken = jwtResult.AccessToken,
                        refreshToken = jwtResult.RefreshToken.TokenString,

                    }

                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message); // return 401 so that the client side can redirect the user to login page
            }
        }

    }
}

