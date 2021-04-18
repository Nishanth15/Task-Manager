using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Model
{
    public class UserPassword
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Salt { get; set; }
        [Key, ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
