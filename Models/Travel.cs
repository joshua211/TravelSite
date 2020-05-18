using System;
using System.Collections.Generic;
using System.Linq;

namespace TravelSite.Models
{
    public class Travel
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Activity> Activities { get; set; }
        private double price;
        public double Price
        {
            get => price + Activities.Sum(a => a.Price);
            set => price = value;
        }

        public TimeSpan TravelLength() => EndDate - StartDate;

    }
}