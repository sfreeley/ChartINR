using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class Dose
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public DateTime DateInput {get; set;}
        public string WeeklyDose { get; set; }
        public int IsActive { get; set; }
    }
}
