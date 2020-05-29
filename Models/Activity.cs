using System.Collections.Generic;

namespace TravelSite.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public Category Category { get; set; }
        public string[] RequiredEquipment { get; set; }
        public string Summary { get; set; }
    }

    public enum Category
    {
        Sport,
        Culture,
        Adventure
    }
}