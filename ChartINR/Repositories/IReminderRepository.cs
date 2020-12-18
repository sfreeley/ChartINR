using ChartINR.Models;

namespace ChartINR.Repositories
{
    public interface IReminderRepository
    {
        void Add(Reminder reminder);
        Reminder GetMostRecentReminder(int id);
    }
}