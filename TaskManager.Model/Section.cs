using System;

namespace TaskManager.Model
{
    public class Section : BaseModel
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public Guid ProjectId { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsArchived { get; set; }
        public int Collapsed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime Modified { get; set; }
        public DateTime DateArchived{ get; set; }
    }
}