using Microsoft.AspNetCore.Mvc;
using TravelSite.Data;
using TravelSite.Models;

namespace TravelSite.Controllers
{
    public class TravelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TravelController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<Travel> GetTravel(int id)
        {
            var travel = _context.Travels.Find(id);

            return travel;
        }

        [HttpPost]
        public ActionResult AddTravel([FromBody] Travel travel)
        {
            _context.Travels.Add(travel);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTravel(int id)
        {
            var travel = _context.Travels.Find(id);
            _context.Travels.Remove(travel);

            _context.SaveChanges();

            return NoContent();
        }

    }
}