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

        #endregion
        
        #region Item
        #endregion
        
        #region Section

        #endregion
    }
}
