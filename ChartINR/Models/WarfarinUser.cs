using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class WarfarinUser
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserProfile UserProfile { get; set; }
        public INRRange INRRange { get; set; }
    }
}
