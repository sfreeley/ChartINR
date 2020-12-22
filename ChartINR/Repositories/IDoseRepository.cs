using ChartINR.Models;

namespace ChartINR.Repositories
{
    public interface IDoseRepository
    {
        Dose GetActiveDose(int id);
    }
}