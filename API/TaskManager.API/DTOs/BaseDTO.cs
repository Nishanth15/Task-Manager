using System;

namespace TaskManager.API.DTOs
{
    public class BaseResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
