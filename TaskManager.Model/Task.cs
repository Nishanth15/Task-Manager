using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager.Model
{
    public class Task : BaseModel
    {
        public string UserId { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public string ProjectId { get; set; }
        public string SectionId { get; set; }
        public string ParentId { get; set; }
        public List<string> Labels { get; set; }
        public int Priority { get; set; }
        public int DayOrder { get; set; }
        public bool Checked { get; set; }
        public bool InHistory { get; set; }
        public bool IsDeleted { get; set; }
        public string AddedBy { get; set; }
        public string AssignedBy { get; set; }
        public string ResponsibleTo { get; set; }
        public DateTime Due { get; set; }
        public DateTime CompletedAt{ get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime Modified { get; set; }
    }
}
