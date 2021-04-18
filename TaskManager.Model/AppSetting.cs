using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TaskManager.Model
{
    class AppSetting
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [StringLength(100)]
        public string KeyName { get; set; }
        public string KeyValue { get; set; }
    }
}
