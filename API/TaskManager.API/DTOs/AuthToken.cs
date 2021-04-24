using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.API.DTOs
{
    public class TokenRequest
    {
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string GrantType { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
    public enum GrantType
    {
        Password = 1,
        Refresh = 2
    }

    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
    }
}
