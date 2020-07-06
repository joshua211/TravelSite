using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using TravelSite.Models;

namespace TravelSite.Data
{
    public class DbInitializer
    {
        public static void SeedUsers(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            if (userManager.FindByEmailAsync("Max@Mustermann.de").Result == null)
            {
                var user = new ApplicationUser()
                {
                    UserName = "Max@Mustermann.de",
                    Email = "Max@Mustermann.de",
                    Gender = "Man",
                    IBAN = "DE1234567890",
                    FirstName = "Max",
                    LastName = "Mustermann",
                    Role = "User"
                };

                var result = userManager.CreateAsync(user, "maxmustermann").Result;
            }

            if (context.Activities.Find(1) == null)
            {
                var activity = new Activity() { Category = Category.Sport, Name = "Surfing", Price = 10, Location = "Germany", OrganizerId = "1", RequiredEquipment = new string[1], Summary = "Surfing in the water" };
                context.Activities.Add(activity);
                context.SaveChanges();
            }

            if (userManager.FindByEmailAsync("Test@Organizer.de").Result == null)
            {
                var activity = context.Activities.Find(1);
                var user = new ApplicationUser()
                {
                    UserName = "Test@Organizer.de",
                    Email = "Test@Organizer.de",
                    IBAN = "DE1234567890",
                    Website = "Testorganizer.de",
                    Role = "Organizer",
                    AvailableActivities = new List<Activity>() { activity }
                };

                var result = userManager.CreateAsync(user, "testorganizer").Result;
            }

            if (userManager.FindByEmailAsync("Ad@min.de").Result == null)
            {
                var user = new ApplicationUser()
                {
                    UserName = "Ad@min.de",
                    Email = "Ad@min.de",
                    Gender = "Man",
                    FirstName = "Keine",
                    LastName = "Ahnung",
                    Role = "Admin"
                };

                var result = userManager.CreateAsync(user, "admin").Result;
            }

        }
    }
}