using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.API.DTOs
{
    public class ProjectRequestDTO
    {
        public string Name { get; set; }
        public int Color { get; set; }
        public int ViewType { get; set; }
    }
}
