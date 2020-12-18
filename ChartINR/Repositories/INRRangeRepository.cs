using ChartINR.Utils;
using ChartINR.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public class INRRangeRepository : BaseRepository , IINRRangeRepository
    {
        public INRRangeRepository(IConfiguration config) : base(config) { }

        public INRRange GetRangeByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ra.Id, ra.WarfarinUserId, ra.MinLevel, ra.MaxLevel, ra.IsActive AS RangeIsActive
                         FROM INRRange ra    
                         WHERE ra.WarfarinUserId = @warfarinUserId AND ra.IsActive = 1
                        ";
                    cmd.Parameters.AddWithValue("@warfarinUserId", id);
                    var reader = cmd.ExecuteReader();
                    INRRange inrRange = null;

                    if (reader.Read())
                    {
                        inrRange = new INRRange()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            WarfarinUserId = DbUtils.GetInt(reader, "WarfarinUserId"),
                            MinLevel = reader.GetDouble(reader.GetOrdinal("MinLevel")),
                            MaxLevel = reader.GetDouble(reader.GetOrdinal("MaxLevel")),
                            IsActive = DbUtils.GetInt(reader, "RangeIsActive")

                        };
                    }

                    reader.Close();
                    return inrRange;
                }

            }

        }

        public void Add(INRRange inrRange)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO INRRange ( WarfarinUserId, MinLevel, MaxLevel, IsActive )
                        OUTPUT INSERTED.ID
                        VALUES ( @WarfarinUserId, @MinLevel, @MaxLevel, @IsActive )";
                    DbUtils.AddParameter(cmd, "@WarfarinUserId", inrRange.WarfarinUserId);
                    DbUtils.AddParameter(cmd, "@MinLevel", inrRange.MinLevel);
                    DbUtils.AddParameter(cmd, "@MaxLevel", inrRange.MaxLevel);
                    DbUtils.AddParameter(cmd, "@IsActive", inrRange.IsActive);

                    inrRange.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Put(INRRange inrRange)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE INRRange 
                        SET
                            MinLevel = @MinLevel,
                            MaxLevel = @MaxLevel
                        WHERE Id = @id
                        ";
                  
                    DbUtils.AddParameter(cmd, "@MinLevel", inrRange.MinLevel);
                    DbUtils.AddParameter(cmd, "@MaxLevel", inrRange.MaxLevel);
                    DbUtils.AddParameter(cmd, "@id", inrRange.Id);

                    cmd.ExecuteNonQuery();


                }
            }
        }
    }
}
