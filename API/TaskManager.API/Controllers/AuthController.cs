using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TaskManager.API.Common.Constants;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.API.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST api/Auth/Token
        [Route("Token")]
        [HttpPost]
        public async Task<IActionResult> GenerateToken([FromBody] TokenRequest tokenRequest)
        {
            try
            {
                var response = await _authService.GenerateToken(tokenRequest);
                if (response != null)
                    return Ok(response);
                else
                    return Content(HttpStatusCode.Unauthorized.ToString(), Constants.UserNotRegistered);
            }
            catch
            {
                return Content(HttpStatusCode.InternalServerError.ToString(), Constants.ServerError);
            }
        }
    }
}
