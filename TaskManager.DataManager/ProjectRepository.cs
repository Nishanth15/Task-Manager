using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Database;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.DataManager
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly UserDbContext _userDbContext;

        public ProjectRepository(UserDbContext userDbContext)
        {
            _userDbContext = userDbContext;
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return await _userDbContext.Projects.ToListAsync();
        }

        public async Task<Project> GetProjectAsync(Guid id)
        {
            return await _userDbContext.Projects.Where(p => p.Id == id).SingleOrDefaultAsync();
        }

        public async Task<Project> AddProjectAsync(Project project)
        {
            await _userDbContext.Projects.AddAsync(project);
            await _userDbContext.SaveChangesAsync();
            return project;

        }
        
        public async Task<Project> UpdateProjectAsync(Project project)
        {
            _userDbContext.Projects.Update(project);
            await _userDbContext.SaveChangesAsync();
            return project;


        }

        public async Task<Project> RemoveProjectAsync(Guid id)
        {
            var project = await _userDbContext.Projects.FindAsync(id);
            _userDbContext.Projects.Remove(project);
            await _userDbContext.SaveChangesAsync();
            return project;
        }

    }
}
