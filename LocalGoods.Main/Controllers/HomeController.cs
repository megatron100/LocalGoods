using LocalGoods.Main.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LocalGoods.Main.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="customer")]
    public class HomeController : ControllerBase
    {
        private readonly LocalGoodsDbContext _dbContext;
        
        public HomeController(LocalGoodsDbContext dbContext   )
        {
            _dbContext = dbContext;
             
        }
        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            
            return Ok();

        }
    }
}
