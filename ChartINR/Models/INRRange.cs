using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class INRRange
    {
        public int Id { get; set; }

        public int WarfarinUserId { get; set; }

        public double MinLevel { get; set; }

        public double MaxLevel { get; set; }

        public int IsActive { get; set; }
    }
}
