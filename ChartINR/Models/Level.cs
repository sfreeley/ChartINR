using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class Level
    {
        public int Id { get; set; }

        public int INRRangeId { get; set; }
    
        public int DoseId { get; set; }

        public int ReminderId { get; set; }

        public DateTime DateDrawn { get; set; }

        public double Result { get; set; }

        public string Comment { get; set; }

        public int InRange { get; set; }

        public UserProfile UserProfile { get; set; }

        public INRRange INRRange { get; set; }

        public Dose Dose { get; set; }

        public Reminder Reminder { get; set; }

    }
}
