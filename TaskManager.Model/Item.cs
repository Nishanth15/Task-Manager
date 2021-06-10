using System;

namespace TaskManager.Model
{
    public class Item : BaseModel
    {
        public Guid UserId { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public Guid ProjectId { get; set; }
        public Guid? SectionId { get; set; }
        public Guid? ParentId { get; set; }
        public int? Priority { get; set; }
        public int DayOrder { get; set; }
        public bool Checked { get; set; }
        public bool InHistory { get; set; }
        public bool IsDeleted { get; set; }
        public Guid AddedBy { get; set; }
        public Guid? AssignedBy { get; set; }
        public Guid? ResponsibleTo { get; set; }
        public int Collapsed { get; set; }
        public DateTime? Due { get; set; }
        public DateTime? CompletedAt{ get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime Modified { get; set; }
    }
}
