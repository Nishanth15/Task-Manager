using System;

namespace TaskManager.API.DTOs
{
    public class BaseResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
    }

    public class CollapseRequest {
        public int Collapse { get; set; }
        public Guid Id { get; set; }
    }
}
