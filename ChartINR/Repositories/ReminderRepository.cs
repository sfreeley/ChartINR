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
                         SELECT TOP 1 re.Id, re.WarfarinUserId, re.DateForNextLevel, re.Completed, re.IsDeleted

                         FROM Reminder re
                        
    
                         WHERE re.WarfarinUserId = @warfarinUserId AND re.Completed = 0 AND re.IsDeleted = 0
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
                            WarfarinUserId = DbUtils.GetInt(reader, "WarfarinUserId"),
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

        public void DeleteReminder(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Reminder
                            SET  
                               IsDeleted = @isDeleted
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@isDeleted", 1);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void PostDate(Reminder reminder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Reminder ( WarfarinUserId, DateForNextLevel, Completed, IsDeleted )
                        OUTPUT INSERTED.ID
                        VALUES ( @WarfarinUserId, @DateForNextLevel, @Completed, @IsDeleted )";
                    DbUtils.AddParameter(cmd, "@WarfarinUserId", reminder.WarfarinUserId);
                    DbUtils.AddParameter(cmd, "@DateForNextLevel", reminder.DateForNextLevel);
                    DbUtils.AddParameter(cmd, "@Completed", reminder.Completed);
                    DbUtils.AddParameter(cmd, "@IsDeleted", reminder.IsDeleted);

                    reminder.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
