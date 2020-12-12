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
    public class INRRangeController : ControllerBase
    {
        private readonly IINRRangeRepository _rangeRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public INRRangeController(IINRRangeRepository rangeRepository, IUserProfileRepository userProfileRepository)
        {
            _rangeRepository = rangeRepository;
            _userProfileRepository = userProfileRepository;
           
        }

        [HttpPost]
        public IActionResult Add(INRRange inrRange)
        {
            
            UserProfile userProfile = GetCurrentUserProfile();
            inrRange.UserProfileId = userProfile.Id;
            inrRange.IsActive = 1;
            _rangeRepository.Add(inrRange);
            return Ok();

        }

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
