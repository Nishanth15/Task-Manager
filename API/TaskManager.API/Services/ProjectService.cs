using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.Common.Constants;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IGenericRepository<Project> _repo;
        private readonly IItemService _itemService;
        private readonly ISectionService _sectionService;
        private readonly IMapper _mapper;

        public ProjectService(IGenericRepository<Project> repo, IItemService itemService, ISectionService sectionService, IMapper mapper)
        {
            _repo = repo;
            _itemService = itemService;
            _sectionService = sectionService;          
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProjectResponse>> GetProjectsAsync(Guid userId)
        {
            var projectList = await _repo.GetProjectsByUserId(userId);
            var projectResponseList = new List<ProjectResponse>();
            projectList.ToList().ForEach(project =>
            {
                if (project != null)
                {
                    var projectResponse = _mapper.Map<Project, ProjectResponse>(project);

                    if (project.Order == 0)
                        projectResponse.IsInbox = true;
                    projectResponseList.Add(projectResponse);
                }
            });
            
            return projectResponseList;
        }

        public async Task<ProjectResponse> GetProjectAsync(Guid id)
        {
            var project = await _repo.GetAsync(id);
            var projectResponse = new ProjectResponse();

            if (project == null)
            {
                projectResponse.Success = true;
                projectResponse.Message = Constants.ProjectNotFound;
            }
            else
            {
                projectResponse = _mapper.Map<Project, ProjectResponse>(project);

            }
            return projectResponse;
        }

        public async Task<ProjectData> GetProjectDataByProjectIdAsync(Guid projectId)
        {
            
            return null;
        }

        public async Task<ProjectResponse> AddProjectAsync(ProjectRequest projectRequest, Guid userId)
        {

            var project = _mapper.Map<ProjectRequest, Project>(projectRequest);
            project.IsArchived = false;
            project.IsDeleted = false;
            project.CreatedAt = DateTime.Now;
            project.Modified = DateTime.Now;
            project.ParentId = projectRequest.ParentId;

            project = await _repo.AddAsync(project);

<<<<<<< HEAD
            if (project != null)
            {
                LK_Project_User projectUserLookup = new LK_Project_User()
                {
                    Id = Guid.NewGuid(),
                    ProjectId = project.Id,
                    UserId = userId,
                    IsAuthor = true
                };
               await _repo.AddProjectUserLookupAsync(projectUserLookup);
            }
=======
            //if (project != null)
            //{
            //    LK_Project_User projectUserLookup = new LK_Project_User()
            //    {
            //        Id = Guid.NewGuid(),
            //        ProjectId = project.Id,
            //        UserId = userId,
            //        IsAuthor = true
            //    };
            //   await _repo.AddProjectUserLookupAsync(projectUserLookup);

            //}
>>>>>>> 7520bbeee28686bd0cf56f34b804dd372dc303a5

            return _mapper.Map<Project, ProjectResponse>(project);

        }

        public async Task<ProjectResponse> UpdateProjectAsync(Guid id, ProjectRequest projectRequest)
        {
            var project = _mapper.Map<ProjectRequest, Project>(projectRequest);
            project.Id = id;
            project.Modified = DateTime.Now;

            project = await _repo.UpdateAsync(project);

            return _mapper.Map<Project, ProjectResponse>(project); 
        }

        public async Task<ProjectResponse> CollapseProjectAsync(Guid id, int Collapsed)
        {
            var project = await _repo.GetAsync(id);
            project.Id = id;
            //project.Collapsed = Collapsed;
            
            project = await _repo.UpdateCollapseAsync(project);

            var projectResponse = _mapper.Map<Project, ProjectResponse>(project);
            projectResponse.Success = true;

            return projectResponse;
        }

        public async Task<BaseResponse> RemoveProjectAsync(Guid id)
        {
            var projectResponse = new BaseResponse()
            {
                Success = false
            };

            if (await IsInboxExistOrNot(id))
            {
                projectResponse.Success = true;
                projectResponse.Message = Constants.InboxCannotBeDeleted;
                return projectResponse;
            }

            bool isDeleted = await MarkProjectAsDeleted(id);

            if (isDeleted)
            {
                projectResponse.Success = true;
                projectResponse.Message = Constants.ProjectDeletedSuccessfully;
            }
            return projectResponse;
            
        }

        private async Task<bool> MarkProjectAsDeleted(Guid id)
        {
            var project = await _repo.GetAsync(id);
            project.IsDeleted = true;

            project = await _repo.UpdateAsync(project);
            if (project == null)
                return false;
            else
                return true;
        }

        public async Task<bool> IsInboxExistOrNot(Guid id)
        {
            return await _repo.IsInboxExistOrNot(id);
        }
    }
}
