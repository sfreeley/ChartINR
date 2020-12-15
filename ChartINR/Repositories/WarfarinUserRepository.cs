using ChartINR.Models;
using ChartINR.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public class WarfarinUserRepository : BaseRepository, IWarfarinUserRepository
    {
        public WarfarinUserRepository(IConfiguration config) : base(config) { }

        public List<WarfarinUser> GetAllWarfarinUsersForUserProfile(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT wu.Id, wu.UserProfileId, wu.DisplayName,
                        
                        up.Username
                        
                        FROM WarfarinUser wu
                        JOIN UserProfile up ON wu.UserProfileId = up.Id
                        WHERE wu.UserProfileId = @userProfileId
                    ";
                    cmd.Parameters.AddWithValue("@userProfileId", id);
                    var reader = cmd.ExecuteReader();
                    List<WarfarinUser> warfarinUsers = new List<WarfarinUser>();

                    while (reader.Read())
                    {
                        warfarinUsers.Add(new WarfarinUser()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            UserProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Username = DbUtils.GetString(reader, "Username")
                            }
                        });
                    }
                    reader.Close();
                    return warfarinUsers;
                }
            }
        }
    }
}
