using ChartINR.Models;
using ChartINR.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public class DoseRepository : BaseRepository, IDoseRepository
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
                         SELECT TOP 1 d.Id, d.WarfarinUserId, d.DateInput, d.WeeklyDose, d.IsActive

                         FROM Dose d
       
                         WHERE d.WarfarinUserId = @warfarinUserId AND d.IsActive = 1
                         ORDER BY d.Id DESC
                        ";
                    cmd.Parameters.AddWithValue("@warfarinUserId", id);
                    var reader = cmd.ExecuteReader();
                    Dose dose = null;

                    if (reader.Read())
                    {
                        dose = new Dose()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            WarfarinUserId = DbUtils.GetInt(reader, "WarfarinUserId"),
                            DateInput = DbUtils.GetDateTime(reader, "DateInput"),
                            WeeklyDose = DbUtils.GetString(reader, "WeeklyDose"),
                            IsActive = DbUtils.GetInt(reader, "IsActive")
                        };
                    }

                    reader.Close();
                    return dose;
                }

            }


        }
    }
}
