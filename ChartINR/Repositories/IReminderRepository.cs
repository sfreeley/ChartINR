using ChartINR.Models;

namespace ChartINR.Repositories
{
    public interface IReminderRepository
    {
        void PostDate(Reminder reminder);
        Reminder GetMostRecentReminder(int id);
    }
}