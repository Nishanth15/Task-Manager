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
        Task<IEnumerable<ProjectResponse>> GetProjectsAsync();
        Task<ProjectResponse> GetProjectAsync(Guid id);
        Task<ProjectResponse> AddProjectAsync(ProjectRequest project);
        Task<ProjectResponse> UpdateProjectAsync(Guid id, ProjectRequest project);
        Task<BaseResponse> RemoveProjectAsync(Guid id);

    }
}
