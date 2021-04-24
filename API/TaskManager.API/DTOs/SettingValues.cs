using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.API.DTOs
{
    public class JWTTokenValues
    {
        public string Secret { get; set; }
        public string AccessTokenExpirationTime { get; set; }
        public string RefreshTokenExpirationTime { get; set; }
    }
}
