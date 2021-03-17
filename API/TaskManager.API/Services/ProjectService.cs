using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepo;

        public ProjectService(IProjectRepository projectRepo)
        {
            _projectRepo = projectRepo;
        }

        public async Task<IEnumerable<ProjectResponseDTO>> GetProjectsAsync()
        {
            var projectList = await _projectRepo.GetProjectsAsync();
            var projectResponseList = new List<ProjectResponseDTO>();
            projectList.ToList().ForEach(project =>
            {
                var projectResponseDTO = new ProjectResponseDTO()
                {
                    Id = project.Id,
                    Name = project.Name,
                    Color = project.Color,
                    ViewType = project.ViewType
                };
                projectResponseList.Add(projectResponseDTO);
            });
            
            return projectResponseList;
        }

        public async Task<ProjectResponseDTO> GetProjectAsync(Guid id)
        {
            var project = await _projectRepo.GetProjectAsync(id);
            var projectResponse = new ProjectResponseDTO();

            if (project == null)
            {
                projectResponse.Status = true;
                //projectResponse.Message = Constant.ProjectNotFound;
            }
            else
            {
                projectResponse.Status = true;
                projectResponse.Id = project.Id;
                projectResponse.Name = project.Name;
                projectResponse.Color = project.Color;
                projectResponse.ViewType = project.ViewType;
            }
            return projectResponse;
        }

        public async Task<ProjectResponseDTO> AddProjectAsync(ProjectRequestDTO projectRequest)
        {
            var project = new Project()
            {
                Name = projectRequest.Name,
                Color = projectRequest.Color,
                ViewType = projectRequest.ViewType
            };
            var projectFromDb = await _projectRepo.AddProjectAsync(project);
            var projectResponse = new ProjectResponseDTO()
            {
                Id = projectFromDb.Id,
                Name = projectFromDb.Name,
                Color = projectFromDb.Color,
                ViewType = projectFromDb.ViewType
            };
            return projectResponse;

        }

        public async Task<ProjectResponseDTO> UpdateProjectAsync(Guid id, ProjectRequestDTO projectRequest)
        {
            var project = new Project()
            {
                Id = id,
                Name = projectRequest.Name,
                Color = projectRequest.Color,
                ViewType = projectRequest.ViewType
            };
            var projectFromDb = await _projectRepo.UpdateProjectAsync(project);
            var projectResponse = new ProjectResponseDTO()
            {
                Id = projectFromDb.Id,
                Name = projectFromDb.Name,
                Color = projectFromDb.Color,
                ViewType = projectFromDb.ViewType
            };
            return projectResponse;
            
        }

        public async Task<ProjectResponseDTO> RemoveProjectAsync(Guid id)
        {
            var project = await _projectRepo.RemoveProjectAsync(id);
            var projectResponse = new ProjectResponseDTO()
            {
                Id = project.Id,
                Name = project.Name,
                Color = project.Color,
                ViewType = project.ViewType
            };
            return projectResponse;
            
        }
    }
}
