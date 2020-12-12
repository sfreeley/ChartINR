using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class INRRange
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public decimal MinLevel { get; set; }

        public decimal MaxLevel { get; set; }

        public int IsActive { get; set; }
    }
}
