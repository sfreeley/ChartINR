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
                    DbUtils.AddParameter(cmd, "@UserProfileId", inrRange.WarfarinUserId);
                    DbUtils.AddParameter(cmd, "@MinLevel", inrRange.MinLevel);
                    DbUtils.AddParameter(cmd, "@MaxLevel", inrRange.MaxLevel);
                    DbUtils.AddParameter(cmd, "@IsActive", inrRange.IsActive);

                    inrRange.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
