using System;

namespace TaskManager.API.DTOs
{
    public class SectionRequest
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public string ProjectId { get; set; }
    }

    public class SectionResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string ProjectId { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsArchived { get; set; }
        public int Collapsed { get; set; }

    }


}
