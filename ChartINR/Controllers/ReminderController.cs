using ChartINR.Models;
using ChartINR.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartINR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReminderController : ControllerBase
    {
        private readonly IReminderRepository _reminderRepository;

        public ReminderController(IReminderRepository reminderRepository)
        {
            _reminderRepository = reminderRepository;
        }

        [HttpGet("mostrecent/{id}")]
        public IActionResult GetMostRecentLevel(int id)
        {

            return Ok(_reminderRepository.GetMostRecentReminder(id));
        }

        [HttpPut("delete/{id}")]
        public ActionResult Delete(int id)
        {

            _reminderRepository.DeleteReminder(id);


            return NoContent();
        }

        [HttpPost]
        public IActionResult PostDate(Reminder reminder)
        {
            reminder.Completed = 0;
            reminder.IsDeleted = 0;
            _reminderRepository.PostDate(reminder);
            return CreatedAtAction("Get", new { id = reminder.Id }, reminder);

        }
    }
}
