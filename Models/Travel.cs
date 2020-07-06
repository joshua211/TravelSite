using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace TravelSite.Models
{
    public class Travel
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<ActivityTravel> ActivitityTravels { get; set; } = new List<ActivityTravel>();
        [NotMapped]
        public List<Activity> Activities { get; set; } = new List<Activity>();
        private double price;
        public double Price
        {
            get => price + Activities.Sum(a => a != null ? a.Price : 0);
            set => price = value;
        }

        public TimeSpan TravelLength() => EndDate - StartDate;

    }
}