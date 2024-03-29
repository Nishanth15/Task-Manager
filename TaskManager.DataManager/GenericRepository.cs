﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Database;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.DataManager
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseModel
    {
        private readonly UserDbContext _userDbContext;
        public GenericRepository(UserDbContext userDbContext)
        {
            _userDbContext = userDbContext;
        }

        #region Generic

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _userDbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetAsync(Guid id)
        {
            try
            {
                return await _userDbContext.Set<T>().Where(obj => obj.Id == id).SingleOrDefaultAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<T> AddAsync(T obj)
        {
            try
            {
                await _userDbContext.Set<T>().AddAsync(obj);
                await _userDbContext.SaveChangesAsync();
                return obj;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<T> UpdateAsync(T obj)
        {
            _userDbContext.Set<T>().Update(obj);
            await _userDbContext.SaveChangesAsync();
            return obj;
        }

        public async Task<T> UpdateCollapseAsync(T obj)
        {
            try
            {
                _userDbContext.Set<T>().Attach(obj);
                _userDbContext.Entry(obj).Property("Collapsed").IsModified = true;
                await _userDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                obj = null;
                return obj;
            }
           
            return obj;
        }

        public async Task<T> MoveAsync(T obj)
        {
            try
            {
                _userDbContext.Set<T>().Attach(obj);
                _userDbContext.Entry(obj).Property("ProjectId").IsModified = true;
                _userDbContext.Entry(obj).Property("SectionId").IsModified = true;
                _userDbContext.Entry(obj).Property("ParentId").IsModified = true;

                await _userDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
            return obj;
        }

        public async Task<bool> RemoveAsync(Guid id)
        {
            var obj = await _userDbContext.Set<T>().FindAsync(id);
            _userDbContext.Set<T>().Remove(obj);
            return await _userDbContext.SaveChangesAsync() > 0;
        }
        #endregion

        #region Project
        public async Task<bool> IsInboxExistOrNot(Guid Id)
        {
            return await _userDbContext.Projects.AnyAsync(project => project.Id == Id && project.Order == 0);
        }
        public async Task<Guid> AddProjectUserLookupAsync(LK_Project_User projectUserLookup)
        {
            try
            {
                await _userDbContext.Set<LK_Project_User>().AddAsync(projectUserLookup);
                await _userDbContext.SaveChangesAsync();
                return projectUserLookup.Id;
            }
            catch (Exception)
            {

                throw;
            }


        }
        public async Task<IEnumerable<T>> GetProjectsByUserId(Guid userId)
        {
            var projectUserLookUps = _userDbContext.Set<LK_Project_User>().Where(lk => lk.UserId == userId);

            IList<T> projects = new List<T>();

            await projectUserLookUps.ForEachAsync(lk => {
                var project = GetAsync(lk.ProjectId).GetAwaiter().GetResult();
                projects.Add(project);
            });

            return projects;
        }
        public LK_Project_User IsValidUserForProject(Guid projectId, Guid userId)
        {
            LK_Project_User lK_Project_User = new LK_Project_User();
            return _userDbContext.Set<LK_Project_User>().Where(lk => (lk.ProjectId == projectId && lk.UserId == userId)).SingleOrDefault();
        }
        #endregion

        #region Item

        public async Task<IEnumerable<Item>> GetItemsByProjectIdAsync(Guid projectId)
        {
            try
            {
                return await _userDbContext.Set<Item>().Where(obj => obj.ProjectId == projectId).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        public async Task<Item> CompleteItemAsync(Guid itemId) 
        {
            try
            {
                var item = await _userDbContext.Set<Item>().Where(obj => obj.Id == itemId).SingleOrDefaultAsync();
                if(item!=null)
                {
                    item.Checked = true;
                    await _userDbContext.SaveChangesAsync();
                    return item;
                }
                else
                {
                    return null;
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }
       
        public async Task<Item> UnCompleteItemAsync(Guid itemId)
        {
            try
            {
                var item = await _userDbContext.Set<Item>().Where(obj => obj.Id == itemId).SingleOrDefaultAsync();
                if(item!=null)
                {
                item.Checked = false;
                await _userDbContext.SaveChangesAsync();
                return item;
                }
                else
                { return null; }
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region Section
        public async Task<IEnumerable<Section>> GetSectionsByProjectId(Guid projectId)
        {
            try
            {
                return await _userDbContext.Set<Section>().Where(obj => obj.ProjectId == projectId).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
    }
}
