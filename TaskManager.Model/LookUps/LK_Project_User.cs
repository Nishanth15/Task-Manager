using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TaskManager.Model
{
    public class LK_Project_User
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public bool IsAuthor { get; set; }

        [Required]
        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; }
    }
}
