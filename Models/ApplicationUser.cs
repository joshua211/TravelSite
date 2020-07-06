using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelSite.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string Role { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string IBAN { get; set; }
        public string Website { get; set; }
        public List<Activity> AvailableActivities { get; set; }
    }
}
