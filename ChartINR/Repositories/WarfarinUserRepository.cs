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
                        SELECT wu.Id, wu.UserProfileId, wu.FirstName, wu.LastName,
                        
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
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
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

        public WarfarinUser GetWarfarinUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT wu.Id, wu.UserProfileId, wu.FirstName, wu.LastName,

                        ra.Id AS RangeId, ra.MinLevel, ra.MaxLevel,
                        
                        up.Username
                        
                        FROM WarfarinUser wu
                        JOIN INRRange ra ON ra.WarfarinUserId = wu.Id
                        JOIN UserProfile up ON wu.UserProfileId = up.Id
                        WHERE wu.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    WarfarinUser warfarinUser = null;

                    if (reader.Read())
                    {
                        warfarinUser = new WarfarinUser()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Username = DbUtils.GetString(reader, "Username")
                            },
                            INRRange = new INRRange
                            { 
                                Id = DbUtils.GetInt(reader, "RangeId"),
                                MinLevel = reader.GetDouble(reader.GetOrdinal("MinLevel")),
                                MaxLevel = reader.GetDouble(reader.GetOrdinal("MaxLevel"))
                            }
                        };
                    }
                    else
                    {
                        reader.Close();
                        return null;
                        
                    }
                    
                    return warfarinUser;
                }
            }
        }

        public void Add(WarfarinUser warfarinUser)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO WarfarinUser ( UserProfileId, FirstName, LastName )
                        OUTPUT INSERTED.ID
                        VALUES ( @UserProfileId, @FirstName, @LastName )
                        ";
                    DbUtils.AddParameter(cmd, "@UserProfileId", warfarinUser.UserProfileId);
                    DbUtils.AddParameter(cmd, "@FirstName", warfarinUser.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", warfarinUser.LastName);
                    
                    warfarinUser.Id = (int)cmd.ExecuteScalar();
                   
                }
            }
        }
    }
}
