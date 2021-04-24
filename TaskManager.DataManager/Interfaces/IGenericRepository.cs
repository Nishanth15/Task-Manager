using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Model;

namespace TaskManager.DataManager.Interfaces
{
    public interface IGenericRepository<T> where T : BaseModel
    {
        #region Generic
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetAsync(Guid id);
        Task<T> AddAsync(T model);
        Task<T> UpdateAsync(T model);
        Task<T> UpdateCollapseAsync(T obj);
        Task<bool> RemoveAsync(Guid id);
        #endregion

        #region Project
        Task<bool> IsInboxExistOrNot(Guid Id);
        Task<Guid> AddProjectUserLookupAsync(LK_Project_User projectUserLookup);

        Task<IEnumerable<T>> GetProjectsByUserId(Guid userId);

        #endregion
    }
}
