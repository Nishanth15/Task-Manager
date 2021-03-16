using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Model;

namespace TaskManager.DataManager.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjectsAsync();
        Task<Project> GetProjectAsync(Guid id);
        Task<Project> AddProjectAsync(Project project);
        Task<Project> UpdateProjectAsync(Guid id, Project project);
        Task<Project> RemoveProjectAsync(Guid id);

    }
}
