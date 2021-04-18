using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<SignUpResponse> SignUp(SignUpRequest signUpRequest);
    }
}
