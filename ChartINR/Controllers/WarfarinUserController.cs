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
    public class WarfarinUserController : ControllerBase
    {

        private readonly IWarfarinUserRepository _warfarinUserRepository;

        public WarfarinUserController(IWarfarinUserRepository warfarinUserRepository)
        {
            _warfarinUserRepository = warfarinUserRepository;
        }

        [HttpGet("userprofile/{id}")]
        public IActionResult Get(int id)
        {

            return Ok(_warfarinUserRepository.GetAllWarfarinUsersForUserProfile(id));
        }


    }
}
