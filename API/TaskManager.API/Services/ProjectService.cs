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

        public async Task<ProjectResponse> GetProjectAsync(Guid id, Guid userId)
        {
            var projectResponse = new ProjectResponse();
            if (!isValidUserForProject(id, userId))
            {
                projectResponse.Message = Constants.ProjectNotFound;
                projectResponse.Success = true;
            }

            var project = await _repo.GetAsync(id);

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

        public async Task<ProjectDataResponse> GetProjectDataAsync(Guid projectId, Guid userId)
        {
            ProjectDataResponse projectDataResponse = new ProjectDataResponse()
            {
                Success = false
            };
            if (!isValidUserForProject(projectId, userId))
            {
                projectDataResponse.Message = Constants.ProjectNotFound;
                projectDataResponse.Success = true;
            }

            ProjectData projectData = new ProjectData();
            var sections = await _repo.GetSectionsByProjectId(projectId);
            projectData.Sections = new List<SectionResponse>();
            sections.ToList().ForEach(section => {
                if (section != null)
                {
                    var sectionResponse = _mapper.Map<Section, SectionResponse>(section);
                    projectData.Sections.Add(sectionResponse);
                }
            });

            var items = await _repo.GetItemsByProjectIdAsync(projectId);
            projectData.Items = new List<ItemResponse>();
            items.ToList().ForEach(item => {
                if (item != null)
                {
                    var itemResponse = _mapper.Map<Item, ItemResponse>(item);
                    projectData.Items.Add(itemResponse);
                }
            });
            if (projectData.Items != null && projectData.Sections != null)
            {
                projectDataResponse.Success = true;
                projectDataResponse.ProjectData = projectData;
            }
            return projectDataResponse;
        }

        private bool isValidUserForProject(Guid projectId, Guid userId)
        {
            bool isValidUser = false;
            LK_Project_User lk_Project_User = _repo.IsValidUserForProject(projectId, userId);
            if (lk_Project_User != null && lk_Project_User.Id != Guid.Empty)
                isValidUser = true;
            else
                isValidUser = false;

            return isValidUser;
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
