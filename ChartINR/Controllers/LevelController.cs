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
    public class LevelController : ControllerBase
    {

        private readonly ILevelRepository _levelRepository;

        public LevelController(ILevelRepository levelRepository)
        {
            _levelRepository = levelRepository;
        }

        [HttpGet("user/{id}")]
        public IActionResult Get(int id)
        {

            return Ok(_levelRepository.GetAllLevelsForRangeByUserId(id));
        }

        [HttpGet("mostrecent/{id}")]
        public IActionResult GetMostRecentLevel(int id)
        {

            return Ok(_levelRepository.GetMostRecentLevel(id));
        }
    }
}
