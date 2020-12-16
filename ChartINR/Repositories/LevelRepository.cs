using ChartINR.Models;
using ChartINR.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public class LevelRepository : BaseRepository, ILevelRepository
    {
        public LevelRepository(IConfiguration config) : base(config) { }

        //all levels (id will be based on warfarin user id)
        public List<Level> GetAllLevelsForRangeByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT l.Id AS LevelId, l.INRRangeId, l.DoseId AS DoseId, l.ReminderId AS ReminderId, l.DateDrawn, l.Result, l.Comment, l.InRange,

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
                        ";
                    cmd.Parameters.AddWithValue("@warfarinUserId", id);
                    var reader = cmd.ExecuteReader();
                    List<Level> levels = new List<Level>();

                    while (reader.Read())
                    {
                        levels.Add(NewLevelFromReader(reader));
                    }

                    reader.Close();
                    return levels;
                }

            }
        }

        public Level GetMostRecentLevel(int id)
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
                    Level level = new Level();

                    if (reader.Read())
                    {
                        level = NewLevelFromReader(reader);
                    }

                    reader.Close();
                    return level;
                }

            }


        }

        private Level NewLevelFromReader(SqlDataReader reader)
        {
            return new Level()
            {
                Id = DbUtils.GetInt(reader, "LevelId"),
                INRRangeId = DbUtils.GetInt(reader, "INRRangeId"),
                DoseId = DbUtils.GetInt(reader, "DoseId"),
                ReminderId = DbUtils.GetInt(reader, "ReminderId"),
                DateDrawn = DbUtils.GetDateTime(reader, "DateDrawn"),
                Result = reader.GetDouble(reader.GetOrdinal("Result")),
                Comment = DbUtils.GetNullableString(reader, "Comment"),
                InRange = DbUtils.GetInt(reader, "InRange"),
                UserProfile = new UserProfile
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    Username = DbUtils.GetString(reader, "Username")

                },
                WarfarinUser = new WarfarinUser
                { 
                    Id = DbUtils.GetInt(reader, "WarfarinUserId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                },
                INRRange = new INRRange
                {
                    Id = DbUtils.GetInt(reader, "INRRangeId"),
                    WarfarinUserId = DbUtils.GetInt(reader, "WarfarinUserId"),
                    MinLevel = reader.GetDouble(reader.GetOrdinal("MinLevel")),
                    MaxLevel = reader.GetDouble(reader.GetOrdinal("MaxLevel")),
                    IsActive = DbUtils.GetInt(reader, "RangeIsActive")
                },
                Dose = new Dose
                {
                    Id = DbUtils.GetInt(reader, "DoseId"),
                    DateInput = DbUtils.GetDateTime(reader, "DateInput"),
                    WeeklyDose = DbUtils.GetString(reader, "WeeklyDose"),
                    IsActive = DbUtils.GetInt(reader, "DoseIsActive")
                },
                Reminder = new Reminder
                {
                    Id = DbUtils.GetInt(reader, "ReminderId"),
                    DateForNextLevel = DbUtils.GetDateTime(reader, "DateForNextLevel"),
                    Completed = DbUtils.GetInt(reader, "Completed")
                }

            };
        }

    }
}
