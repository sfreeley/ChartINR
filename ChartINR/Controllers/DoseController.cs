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
    public class DoseController : ControllerBase
    {
        private readonly IDoseRepository _doseRepository;

        public DoseController(IDoseRepository doseRepository)
        {
            _doseRepository = doseRepository;
        }
        [HttpGet("active/{id}")]
        public IActionResult GetDose(int id)
        {

            return Ok(_doseRepository.GetActiveDose(id));
        }
    }
}
