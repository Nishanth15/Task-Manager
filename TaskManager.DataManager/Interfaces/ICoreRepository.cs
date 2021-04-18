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
        Task<User> AddUser(User user);
        Task<UserPassword> AddUserPassword(UserPassword userPassword);

    }
}
