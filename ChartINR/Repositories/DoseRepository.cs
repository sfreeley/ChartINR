using ChartINR.Models;
using ChartINR.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public class DoseRepository : BaseRepository
    {
        public DoseRepository(IConfiguration config) : base(config) { }
        public Dose GetActiveDose(int id)
        {
           
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT TOP 1 l.Id AS LevelId, l.INRRangeId, l.DoseId AS DoseId, l.ReminderId AS ReminderId, l.DateDrawn, l.Result, l.Comment, l.InRange,

                         up.Id AS UserProfileId, up.Username,

                         ra.WarfarinUserId, ra.MinLevel, ra.MaxLevel, ra.IsActive AS RangeIsActive,

                         re.DateForNextLevel, re.Completed,

                         wu.FirstName, wu.LastName,

                         d.DateInput, d.WeeklyDose, d.IsActive AS DoseIsActive

                         FROM Level l
                         LEFT JOIN Reminder re ON l.ReminderId = re.Id
                         LEFT JOIN INRRange ra ON l.INRRangeId = ra.Id 
                         LEFT JOIN Dose d ON l.DoseId = d.Id
                         LEFT JOIN WarfarinUser wu ON d.WarfarinUserId = wu.Id
                         LEFT JOIN UserProfile up ON wu.UserProfileId = up.Id
                             
                         WHERE wu.Id = @warfarinUserId AND ra.IsActive = 1 AND re.Id IS NOT NULL
                         ORDER BY l.Id DESC
                        ";
                    cmd.Parameters.AddWithValue("@warfarinUserId", id);
                    var reader = cmd.ExecuteReader();
                    Dose dose = null;

                    if (reader.Read())
                    {
                        dose = new Dose()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),

                        };
                    }

                    reader.Close();
                    return dose;
                }

            }


        }
    }
}
