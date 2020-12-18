using System;
using ChartINR.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Repositories
{
    public interface IINRRangeRepository
    {
        void Add(INRRange inrRange);
        INRRange GetRangeByUserId(int id);
        void Put(INRRange inrRange);

    }
}
