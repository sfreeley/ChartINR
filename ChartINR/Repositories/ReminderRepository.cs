using ChartINR.Models;
using ChartINR.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public class ReminderRepository : BaseRepository, IReminderRepository
    {
        public ReminderRepository(IConfiguration config) : base(config) { }

        public Reminder GetMostRecentReminder(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT TOP 1 re.Id, re.DateForNextLevel, re.Completed

                         FROM Reminder re
                         LEFT JOIN Level l ON l.ReminderId = re.Id
                         LEFT JOIN INRRange ra ON l.INRRangeId = ra.Id
    
                         WHERE ra.WarfarinUserId = @warfarinUserId AND re.Completed = 0
                         ORDER BY re.Id DESC
                        ";
                    cmd.Parameters.AddWithValue("@warfarinUserId", id);
                    var reader = cmd.ExecuteReader();
                    Reminder reminder = null;

                    if (reader.Read())
                    {
                        reminder = new Reminder()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DateForNextLevel = DbUtils.GetDateTime(reader, "DateForNextLevel"),
                            Completed = DbUtils.GetInt(reader, "Completed")

                        };
                    }
                    else 
                    {
                        reader.Close();
                        return null;
                    }
                    
                    return reminder;
                }

            }

        }

        public void Add(Reminder reminder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Reminder ( WarfarinUserId, DateForNextLevel, Completed )
                        OUTPUT INSERTED.ID
                        VALUES ( @WarfarinUserId, @DateForNextLevel, @Completed )";
                    DbUtils.AddParameter(cmd, "@WarfarinUserId", reminder.WarfarinUserId);
                    DbUtils.AddParameter(cmd, "@DateForNextLevel", reminder.DateForNextLevel);
                    DbUtils.AddParameter(cmd, "@Completed", reminder.Completed);

                    reminder.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
