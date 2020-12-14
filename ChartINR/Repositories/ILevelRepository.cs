using ChartINR.Models;
using System.Collections.Generic;

namespace ChartINR.Repositories
{
    public interface ILevelRepository
    {
        List<Level> GetAllLevelsForRangeByUserId(int id);
    }
}