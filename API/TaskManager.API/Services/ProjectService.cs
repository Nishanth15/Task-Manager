using AutoMapper;
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
        private readonly IGenericRepository<Project> _genericRepo;
        private readonly IMapper _mapper;

        public ProjectService(IProjectRepository projectRepo, IGenericRepository<Project> genericRepo, IMapper mapper)
        {
            _projectRepo = projectRepo;
            _genericRepo = genericRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProjectResponse>> GetProjectsAsync()
        {
            var projectList = await _genericRepo.GetAllAsync();
            var projectResponseList = new List<ProjectResponse>();
            projectList.ToList().ForEach(project =>
            {
                var projectResponse = _mapper.Map<Project, ProjectResponse>(project);

                if(project.Order == 0)
                    projectResponse.IsInbox = true;
                projectResponseList.Add(projectResponse);
            });
            
            return projectResponseList;
        }

        public async Task<ProjectResponse> GetProjectAsync(Guid id)
        {
            var project = await _genericRepo.GetAsync(id);
            var projectResponse = new ProjectResponse();

            if (project == null)
            {
                projectResponse.Status = true;
                //projectResponse.Message = Constant.ProjectNotFound;
            }
            else
            {
                projectResponse = _mapper.Map<Project, ProjectResponse>(project);

            }
            return projectResponse;
        }

        public async Task<ProjectResponse> AddProjectAsync(ProjectRequest projectRequest)
        {

            var project = _mapper.Map<ProjectRequest, Project>(projectRequest);
            project.IsArchived = false;
            project.IsDeleted = false;
            project.CreatedAt = DateTime.Now;
            project.Modified = DateTime.Now;
            project.ParentId = projectRequest.ParentId;

            project = await _genericRepo.AddAsync(project);

            var projectResponse = _mapper.Map<Project, ProjectResponse>(project);

            return projectResponse;

        }

        public async Task<ProjectResponse> UpdateProjectAsync(Guid id, ProjectRequest projectRequest)
        {
            var project = _mapper.Map<ProjectRequest, Project>(projectRequest);
            project.Modified = DateTime.Now;

            project = await _genericRepo.UpdateAsync(project);
            var projectResponse = _mapper.Map<Project, ProjectResponse>(project);

            return projectResponse;
            
        }

        public async Task<BaseResponse> RemoveProjectAsync(Guid id)
        {
            var projectResponse = new BaseResponse()
            {
                Status = false
            };

            if (await IsInboxExistOrNot(id))
            {
                projectResponse.Message = "Inbox cannot be deleted!!!";
                return projectResponse;
            }

            bool isDeleted = await MarkProjectAsDeleted(id);

            if (isDeleted)
            {
                projectResponse.Status = true;
                projectResponse.Message = "Project deleted successfully!!!";
            }
            return projectResponse;
            
        }

        private async Task<bool> MarkProjectAsDeleted(Guid id)
        {
            var project = await _genericRepo.GetAsync(id);
            project.IsDeleted = true;

            project = await _genericRepo.UpdateAsync(project);
            if (project == null)
                return false;
            else
                return true;
        }

        public async Task<bool> IsInboxExistOrNot(Guid id)
        {
            return await _genericRepo.IsInboxExistOrNot(id);
        }




    }
}
