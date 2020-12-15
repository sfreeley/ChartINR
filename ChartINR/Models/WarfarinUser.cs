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
        public string DisplayName { get; set; }
        
        public UserProfile UserProfile { get; set; }
    }
}
