using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager.Model
{
    public class Section : BaseModel
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public string ProjectId { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsArchived { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime Modified { get; set; }
        public DateTime DateArchived{ get; set; }
    }
}