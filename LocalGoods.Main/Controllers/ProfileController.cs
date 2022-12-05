using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LocalGoods.Main.Controllers
{
    [Route("api")]
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
            var user = _customerService.CurrentUser();
            if (user == null)
                return new ResponseModel()
                {
                    Message = "User does not exists. Please Login to Continue.. ",
                    Status = false,
                    Data = null,
                };
            user.Password = "";
            return new ResponseModel()
            {
                Message = "User Found ",
                Status = true,
                Data = user
            };

        }

        [HttpGet("User")]
        [Authorize(Roles =Role.Customer)]
        public async Task<ActionResult> GetProfileById(int id)
        {
             
            var user = await _dbContext.User.Where(x => x.Id == id).Select(y => y).FirstOrDefaultAsync();
            if (user is null)
            {
                return NotFound(new ResponseModel
                {
                    Status = false,
                    Message = "User Not Found"
                    
                });
            }
            user.Password = "";
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "User Found",
                Data = user
            });
        }

        [HttpPut("Edit")]
        public async Task<ActionResult<ResponseModel>> EditUser([FromBody] EditProfileRequest request)
        {
            var user = _customerService.CurrentUser();
            if (user == null)
                return new ResponseModel()
                {
                    Message = "User does not exists. Please Login to Continue.. ",
                    Status = false,
                    
                };
            if (!string.IsNullOrEmpty(request.Name))
            { user.Name = request.Name; }
            
            if (!string.IsNullOrEmpty(request.MobileNum))
            { user.Mobile = request.MobileNum; }
             
            _dbContext.User.Update(user);
            await _dbContext.SaveChangesAsync();
            
            return new ResponseModel()
            {
                Message = "User Updated Successfully ",
                Status = true,
                
            };
        }
        [HttpPut("ChangePassword")]
        public async Task<ActionResult<ResponseModel>> ChangePassword([FromBody] ChangePasswordModel changePassword)
        {
            try
            {
                var user = _customerService.CurrentUser();
                if(changePassword.Email!=user.Email)
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
                user.Password = changePassword.Password;
                _dbContext.User.Update(user);
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
