namespace TravelSite.Models
{
    public class ActivityTravel
    {
        public int TravelId { get; set; }
        public Travel Travel { get; set; }
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}