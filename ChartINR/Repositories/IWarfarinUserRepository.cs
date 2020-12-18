using ChartINR.Models;
using System.Collections.Generic;

namespace ChartINR.Repositories
{
    public interface IWarfarinUserRepository
    {
        List<WarfarinUser> GetAllWarfarinUsersForUserProfile(int id);
        void Add(WarfarinUser warfarinUser);
        WarfarinUser GetWarfarinUserById(int id);
    }
}