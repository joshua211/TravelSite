using System;
using Microsoft.AspNetCore.Mvc;

namespace TravelSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GreetingsController : ControllerBase
    {
        [HttpGet]
        public string GetGreeting()
        {
            var random = new Random();

            return Greetings[random.Next(3)];
        }


        public string[] Greetings = {
            "Hallo",
            "Hello",
            "Bonjour"
        };
    }
}