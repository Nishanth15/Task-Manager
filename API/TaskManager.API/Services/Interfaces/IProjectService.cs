using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;
using TaskManager.Model;

namespace TaskManager.API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectResponseDTO>> GetProjectsAsync();
        Task<ProjectResponseDTO> GetProjectAsync(Guid id);
        Task<ProjectResponseDTO> AddProjectAsync(ProjectRequestDTO project);
        Task<ProjectResponseDTO> UpdateProjectAsync(Guid id, ProjectRequestDTO project);
        Task<ProjectResponseDTO> RemoveProjectAsync(Guid id);
    }
}
