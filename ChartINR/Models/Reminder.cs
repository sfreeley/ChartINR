using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class Reminder
    {
        public int Id { get; set; }
        public DateTime DateForNextLevel { get; set; }
        public int Completed { get; set; }
    }
}
