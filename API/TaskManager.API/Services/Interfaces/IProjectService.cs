using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectResponse>> GetProjectsAsync(Guid userId);
        Task<ProjectResponse> GetProjectAsync(Guid id, Guid userId);
        Task<ProjectResponse> AddProjectAsync(ProjectRequest projectRequest, Guid userId);
        Task<ProjectResponse> UpdateProjectAsync(Guid id, ProjectRequest projectRequest);
        Task<BaseResponse> RemoveProjectAsync(Guid id);
        Task<ProjectResponse> CollapseProjectAsync(Guid id, int Collapsed);
    }
}
