using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LocalGoods.Main.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    }; 

        [HttpGet(Name = "WeatherForecast")]
        public IEnumerable<string> Get()
        {
            //create a hashmap
            var map = new Dictionary<string, string>();
            //add a array to this map
            map.Add("key", "value");

            return Summaries;
        }
    }
}
