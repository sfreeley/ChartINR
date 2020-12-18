using ChartINR.Models;
using ChartINR.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChartINR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarfarinUserController : ControllerBase
    {

        private readonly IWarfarinUserRepository _warfarinUserRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IINRRangeRepository _inrRangeRepository;

        public WarfarinUserController(IWarfarinUserRepository warfarinUserRepository, IUserProfileRepository userProfileRepository, IINRRangeRepository inrRangeRepository)
        {
            _warfarinUserRepository = warfarinUserRepository;
            _userProfileRepository = userProfileRepository;
            _inrRangeRepository = inrRangeRepository; 
        }

        [HttpGet("userprofile/{id}")]
        public IActionResult Get(int id)
        {

            return Ok(_warfarinUserRepository.GetAllWarfarinUsersForUserProfile(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {

            return Ok(_warfarinUserRepository.GetWarfarinUserById(id));
        }

        [HttpPost]
        public IActionResult PostWarfarinUser(WarfarinUser warfarinUser)
        {

            UserProfile userProfile = GetCurrentUserProfile();
            warfarinUser.UserProfileId = userProfile.Id;
            _warfarinUserRepository.Add(warfarinUser);
            INRRange inrRange = new INRRange();
            inrRange.WarfarinUserId = warfarinUser.Id;
            inrRange.MinLevel = 0;
            inrRange.MaxLevel = 0;
            inrRange.IsActive = 1;
            _inrRangeRepository.Add(inrRange);
          
            return CreatedAtAction("Get", new { id = warfarinUser.Id }, warfarinUser);

        }

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
