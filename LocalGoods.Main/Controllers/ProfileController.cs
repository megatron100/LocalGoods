using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private LocalGoodsDbContext _dbContext;
        private UserService _customerService;

        public ProfileController
            (
            LocalGoodsDbContext _localgoodsdbcontext,
            UserService customerService
            )
        {
            _dbContext = _localgoodsdbcontext;

            _customerService = customerService;

        }

        [HttpGet("")]
        public ActionResult<ResponseModel> Get()
        {
            var curuser = _customerService.CurrentUser();
            if (curuser == null)
                return new ResponseModel()
                {
                    Message = "User does not exists. Please Login to Continue.. ",
                    Status = false,
                    Data = null,
                };
            return new ResponseModel()
            {
                Message = "User Found ",
                Status = true,
                Data = curuser
            };

        }
        [HttpPut("Edit")]
        public async Task<ActionResult<ResponseModel>> EditUser([FromBody] User request, int? product_id)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var product = _dbContext.Product.Where(x => x.Id == product_id).FirstOrDefault();
                if (product == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new { Message = "Product Not Found" });
                }
                else
                {
                    User edituser = new User()
                    {
                        Name=request.Name,
                        Mobile=request.Mobile,
                    };
                    _dbContext.User.Update(edituser);
                    await _dbContext.SaveChangesAsync();
                    response.Status = true;
                    response.Data = product;
                    response.Message = "UserDetails Updated Successfully";
                }

                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPut("ChangePassword")]
        public async Task<ActionResult<ResponseModel>> ChangePassword([FromBody] ChangePasswordModel changePassword)
        {
            try
            {
                var curuser = _customerService.CurrentUser();
                if(changePassword.Email!=curuser.Email)
                    return new ResponseModel()
                    {
                        Message="Incorrect EmailId..",
                        Status=false

                    };
                
                if(changePassword.Password!=changePassword.ConfirmPassword)
                    return new ResponseModel()
                    {
                        Status=false,
                        Message="Password does not Match.."
                    };
                curuser.Password = changePassword.Password;
                _dbContext.User.Update(curuser);
                await _dbContext.SaveChangesAsync();

                return Ok(new ResponseModel()
                {
                    Message = "Password Changed Successfully",
                    Status = true
                }) ;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        //Profile Picture Actikon Method need to be Implemented


    }
}
