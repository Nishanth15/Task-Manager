using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.API.DTOs
{
    public class ProjectResponseDTO: BaseResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Color { get; set; }
        public int ViewType { get; set; }
    }
}
