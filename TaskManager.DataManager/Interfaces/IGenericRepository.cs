using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Model;

namespace TaskManager.DataManager.Interfaces
{
    public interface IGenericRepository<T> where T : BaseModel
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetAsync(Guid id);
        Task<T> AddAsync(T model);
        Task<T> UpdateAsync(T model);
        Task<bool> RemoveAsync(Guid id);


        #region Project
        Task<bool> IsInboxExistOrNot(Guid Id);

        #endregion
    }
}
