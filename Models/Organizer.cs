using System.Collections.Generic;

namespace TravelSite.Models
{
    public class Organizer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public List<Activity> AvailableActivities { get; set; }
    }
}