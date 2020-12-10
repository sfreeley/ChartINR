using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Models
{
    public class UserProfile
    {
      
            public int Id { get; set; }

            [Required]
            [StringLength(28, MinimumLength = 28)]
            public string FirebaseUserId { get; set; }

            [Required]
            [MaxLength(50)]
            public string Username { get; set; }

            [Required]
            [MaxLength(255)]
            public string Email { get; set; }

        
    }
}
