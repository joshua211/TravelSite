using System;
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
    public class ActivityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ActivityController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            this._context = context;
            this._userManager = userManager;
        }

        [HttpGet]
        public List<Activity> GetAllActivities()
        {
            var acts = _context.Activities.ToList();

            return acts;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int id)
        {
            var act = await _context.Activities.FindAsync(id);
            if (act == null)
                return NotFound();
            else
                return act;
        }

        [HttpGet("ByLocation/{location}")]
        public List<Activity> GetActivitiesByLocation(string location)
        {
            var acts = _context.Activities.Where(a => a.Location == location).ToList();

            return acts;
        }

        [Authorize]
        [HttpGet("Organizer")]
        public async Task<ActionResult<List<Activity>>> GetActivitiesByOrganizer()
        {
            var user = await _userManager.GetUserAsync(User);
            if (User == null)
                return NotFound();
            var acts = _context.Activities.Where(a => a.OrganizerId == user.Id);

            return acts.ToList();
        }

        [HttpGet("Category")]
        public string[] GetCategorys() => Enum.GetNames(typeof(Category));

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> AddActivity([FromBody] Activity activity)
        {
            var user = await _userManager.GetUserAsync(User);
            activity.OrganizerId = user.Id;
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(int id)
        {
            var act = await _context.Activities.FindAsync(id);
            if (act == null)
                return NotFound();
            else
                _context.Activities.Remove(act);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateActivity([FromBody] Activity activity)
        {
            _context.Entry(activity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}