using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelSite.Data;
using TravelSite.Models;

namespace TravelSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TravelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TravelController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Travel>> GetAllTravels()
        {
            var travels = _context.Travels.Include(t => t.Activities).ToList();

            return travels;
        }

        [HttpGet("User")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Travel>>> GetTravelByUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return BadRequest();

            var travels = _context.Travels
                .Include(t => t.ActivitityTravels)
                .ThenInclude(at => at.Activity)
                .Where(t => t.UserId == user.Id);
            travels.ToList().ForEach(travel =>
            {
                travel.Activities = travel.ActivitityTravels.Select(at => at.Activity).ToList();
                travel.Activities.ForEach(a => a.ActivitityTravels.Clear());
            });


            return travels.ToList();
        }



        [HttpGet("{id}")]
        public ActionResult<Travel> GetTravel(int id)
        {
            var travel = _context.Travels.Include(t => t.ActivitityTravels).ThenInclude(at => at.Activity).FirstOrDefault(t => t.Id == id);
            if (travel == null)
                return NotFound();

            travel.Activities = travel.ActivitityTravels.Select(at => at.Activity).ToList();
            travel.Activities.ForEach(a => a.ActivitityTravels.Clear());
            travel.ActivitityTravels.Clear();

            return travel;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> AddTravel([FromBody] Travel travel)
        {
            if (!ModelState.IsValid)
                return NotFound();
            var user = await _userManager.GetUserAsync(User);
            travel.User = user;
            travel.UserEmail = user.Email;
            travel.Activities.ForEach(a => travel.ActivitityTravels.Add(new ActivityTravel() { Activity = a, Travel = travel }));
            _context.Travels.Add(travel);
            _context.Entry(user).State = EntityState.Detached;
            travel.Activities.ForEach(a => _context.Attach(a));

            _context.ActivityTravels.AddRange(travel.ActivitityTravels);
            _context.SaveChanges();
            return Ok(travel);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeleteTravel(int id)
        {
            var travel = _context.Travels.Find(id);
            _context.Travels.Remove(travel);

            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("Locations")]
        public ActionResult<string[]> GetAvailableLocations() => TravelLocations;


        public static string[] TravelLocations = { "Italy", "Spain", "Sweden", "England", "USA" };

    }
}