using LocalGoods.DAL;
using LocalGoods.Common.Infrastructure;
using LocalGoods.Common.EfModels;
using LocalGoods.Main.Model.BussinessModels; using LocalGoods.Common.Helpers.Constants;
 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using LocalGoods.Services;
using LocalGoods.Services.IServices;

namespace LocalGoods.Main.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private LocalGoodsDbContext _dbContext;
        private IUserService _customerService;

        public ProfileController
            (
            LocalGoodsDbContext _localgoodsdbcontext,
            IUserService customerService

            )
        {
            _dbContext = _localgoodsdbcontext;

            _customerService = customerService;

        }
        
        [HttpGet("Profile")]

        public async Task<ActionResult> Get()
        {
            var user = _customerService.CurrentUser();

            return Ok(new ResponseModel()
            {
                Message = "User Found ",
                Status = true,
                Data = user
            });
        }

        [HttpGet("User/{id:int}")]
        [Authorize(Roles = Role.Customer)]
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
            if (user.Address == null)
            {
                user.Address = new Address();
            }
            if (!string.IsNullOrEmpty(request.address.postCode))
            {
                user.Address.PinCode = request.address.postCode;
            }
            if (!string.IsNullOrEmpty(request.address.country))
            {
                user.Address.Country = request.address.country;
            }
            if (!string.IsNullOrEmpty(request.address.city))
            {
                user.Address.City = request.address.city;
            }
            if (!string.IsNullOrEmpty(request.address.area))
            {
                user.Address.Area = request.address.area;
            }

            if (!string.IsNullOrEmpty(request.address.Cordinates))
            {
                user.Address.Cordinates = request.address.Cordinates;
            }

            if (!string.IsNullOrEmpty(request.basicInfo.Name))
            { user.Name = request.basicInfo.Name; }

            if (!string.IsNullOrEmpty(request.basicInfo.mobile))
            { user.Mobile = request.basicInfo.mobile; }

            _dbContext.User.Update(user);
            await _dbContext.SaveChangesAsync();

            return new ResponseModel()
            {
                Message = "User Updated Successfully ",
                Status = true,
                Data = user

            };
        }
        [HttpPut("ChangePassword")]
        public async Task<ActionResult<ResponseModel>> ChangePassword([FromBody] ChangePasswordModel changePassword)
        {
            try
            {
                var user = _customerService.CurrentUser();

                if (EncryptPassword.CalculateSHA256(changePassword.existingPassword) != user.Password)
                {
                    return new ResponseModel()
                    {
                        Status = false,
                        Message = " Existing Password is incorrect"
                    };
                }

                if (changePassword.newPassword != changePassword.passConfirm)
                {
                    return new ResponseModel()
                    {
                        Status = false,
                        Message = "Password does not Match.."
                    };
                }

                if (EncryptPassword.CalculateSHA256(changePassword.newPassword) == user.Password)
                {
                    return new ResponseModel()
                    {
                        Status = false,
                        Message = " Existing Password cannot be same as new"
                    };
                }
                
                user.Password = EncryptPassword.CalculateSHA256(changePassword.newPassword);
                _dbContext.User.Update(user);
                await _dbContext.SaveChangesAsync();

                return Ok(new ResponseModel()
                {
                    Message = "Password Changed Successfully",
                    Status = true
                });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
