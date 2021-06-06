using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.Common.Constants;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User/Register
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] SignUpRequest signUpRequest)
        {
            try
            {
                return Ok(await _userService.SignUp(signUpRequest));

            }
            catch (Exception ex)
            {
                return Content(ex.ToString());
            }
        }
    }
}
