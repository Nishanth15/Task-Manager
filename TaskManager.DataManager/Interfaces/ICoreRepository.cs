using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Model;

namespace TaskManager.DataManager.Interfaces
{
    public interface ICoreRepository
    {
        #region User
        Task<User> AddUser(User user);
        Task<User> GetUserByEmailIdAsync(string emailId);
        Task<User> GetUserById(Guid userId);            
        Task<UserPassword> GetUserPasswordByUserId(Guid userId);
        Task<UserPassword> AddUserPassword(UserPassword userPassword);
        #endregion
      
    }
}
