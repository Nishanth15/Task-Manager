﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectResponse>> GetProjectsAsync();
        Task<ProjectResponse> GetProjectAsync(Guid id);
        Task<ProjectResponse> AddProjectAsync(ProjectRequest project);
        Task<ProjectResponse> UpdateProjectAsync(Guid id, ProjectRequest project);
        Task<BaseDTO> RemoveProjectAsync(Guid id);

    }
}
