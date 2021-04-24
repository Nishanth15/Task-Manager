using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public UserDetails CurrentUser
        {
            get
            {
                object currentUser;
                HttpContext.Items.TryGetValue("currentUser", out currentUser);
                return (UserDetails)currentUser;
            }
        }
    }
}
