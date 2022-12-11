using LocalGoods.Main.DAL;
using LocalGoods.Main.Model;
using LocalGoods.Main.Model.BussinessModels;
using LocalGoods.Main.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class AddressController : ControllerBase
    {
        private readonly LocalGoodsDbContext _dbContext;
        private readonly UserService _userService;
        public AddressController
            (
            LocalGoodsDbContext dbContext,
            UserService userService
            )

        {
            _dbContext = dbContext;
            _userService = userService;
        }
        [HttpGet("Get")]
        public async Task<ActionResult> Get()
        {
          var user=  _userService.CurrentUser();
            var response = new ResponseModel();
           
            if (user is null)
            {
                response.Status = false;
                response.Message = "User Not Found";
                
                return StatusCode(StatusCodes.Status404NotFound, response);
               
            }
            if(user.Address is null)
            {
                response.Status = false;
                response.Message = "Address of given user Not Found";

                return StatusCode(StatusCodes.Status404NotFound, response);
            }

            response.Status = true;
            response.Message = "Address found";
            response.Data = user.Address;
            return Ok(response);

        }

        [HttpPost("Add")]
        public async Task<ActionResult> AddAddress([FromBody] AddressRequest addressRequest)
        {
            //for now anybody can change address of anybody

            Address address = new Address();
            ResponseModel response = new ResponseModel();
            address.PinCode = addressRequest.PinCode;
            address.City = addressRequest.City;
            address.Country = addressRequest.Country;
            address.Area = addressRequest.Area;
            address.Cordinates = addressRequest.Cordinates;

            try
            {

                var user=_userService.CurrentUser();
                if (user is null)
                {
                    response.Status = false;
                    response.Message = "User Not found";
                    return StatusCode(StatusCodes.Status404NotFound, response);
                }
                _dbContext.Address.Add(address);
                user.Address = address;
                _dbContext.User.Update(user);
                _dbContext.SaveChanges();
                response.Status = true;
                response.Message = "Address added successfully";
                response.Data = address;
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        // PUT api/<AddressController>/5
        [HttpPut("ChangeAddress")]
        public IActionResult Put( [FromBody] AddressChangeRequest addressRequest)
        {
            ResponseModel response = new ResponseModel();
            try
            {

                var user = _userService.CurrentUser();  

                if (user == null)
                {
                    response.Status = false;
                    response.Message = "Address with given User Id Not found";
                    return StatusCode(404, response);
                }
                var address = user.Address;
                if(address is null)
                {
                    response.Status = false;
                    response.Message = "Existing Address Not found";
                    return StatusCode(404, response);
                }

                if (addressRequest.PostCode != null)
                {
                    address.PinCode = addressRequest.PostCode;
                }
                if (addressRequest.Country != null)
                {
                    address.Country = addressRequest.Country;
                }
                if (addressRequest.City != null)
                {
                    address.City = addressRequest.City;
                }
                if (addressRequest.Area != null)
                {
                    address.Area = addressRequest.Area;
                }
                if (addressRequest.Cordinates != null)
                {
                    address.Cordinates = addressRequest.Cordinates;
                }
                _dbContext.Address.Update(address);
                _dbContext.User.Update(user);
                _dbContext.SaveChanges();
                response.Status = true;
                response.Message = "Address Updated Successfully";
                response.Data = address;
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpDelete("Delete")]
        public ActionResult Delete( )
        {

            var user = _userService.CurrentUser();
            ResponseModel response = new ResponseModel();
            if(user is null)
            {
                response.Status = false;
                response.Message = "User Not found";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            if(user.Address is null)
            {
                response.Status = false;
                response.Message = "No Address Found, No need to delete";
                return StatusCode(StatusCodes.Status404NotFound, response);
            }

            _dbContext.Address.Remove(user.Address);
            user.Address = null;
            _dbContext.User.Update(user);

            _dbContext.SaveChanges();
            response.Status = true;
            response.Status = true;
            response.Message = "Address deleted successfull";
           
            return Ok( response);

        }
    }
}
