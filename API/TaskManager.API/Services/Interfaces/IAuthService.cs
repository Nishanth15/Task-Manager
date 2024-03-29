﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<TokenResponse> GenerateToken(TokenRequest tokenRequest);
    }
}
