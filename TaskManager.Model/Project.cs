using System;

namespace TaskManager.Model
{
    public class Project : BaseModel
    {
        public string Name{ get; set; }
        public int Color { get; set; }
        public int ViewType { get; set; }
        public int Order { get; set; }
        public Guid ParentId { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsArchived { get; set; }
        public bool IsFavorite { get; set; }
        public int Collapsed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime Modified { get; set; }
    }

   

}
