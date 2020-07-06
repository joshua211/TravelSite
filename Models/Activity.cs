using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TravelSite.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("ApplicationUser")]
        public string OrganizerId { get; set; }
        public double Price { get; set; }
        public string Location { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Category Category { get; set; }
        public string[] RequiredEquipment { get; set; }
        public List<ActivityTravel> ActivitityTravels { get; set; } = new List<ActivityTravel>();
        public string Summary { get; set; }
    }

    public enum Category
    {
        [EnumMember(Value = "Sport")]
        Sport,
        [EnumMember(Value = "Culture")]
        Culture,
        [EnumMember(Value = "Adventure")]
        Adventure
    }
}