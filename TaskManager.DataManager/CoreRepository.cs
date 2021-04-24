using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Database;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.DataManager
{
    public class CoreRepository : ICoreRepository
    {
        private readonly UserDbContext _userDbContext;
        public CoreRepository(UserDbContext userDbContext)
        {
            _userDbContext = userDbContext;
        }
        #region User
        public async Task<User> AddUser(User user)
        {

            try
            {
                await _userDbContext.Set<User>().AddAsync(user);
                await _userDbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<User> GetUserByEmailIdAsync(string emailId)
        {
            try
            {
                return await _userDbContext.Set<User>().Where<User>(obj => obj.EmailId == emailId).SingleOrDefaultAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<User> GetUserById(Guid userId)
        {
            try
            {
                return await _userDbContext.Set<User>().Where<User>(obj => obj.Id == userId).SingleOrDefaultAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<UserPassword> AddUserPassword(UserPassword userPassword)
        {
            try
            {
                await _userDbContext.Set<UserPassword>().AddAsync(userPassword);
                await _userDbContext.SaveChangesAsync();
                return userPassword;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<UserPassword> GetUserPasswordByUserId(Guid userId)
        {
            try
            {
                return await _userDbContext.Set<UserPassword>().Where(obj => obj.UserId == userId).SingleOrDefaultAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

   
    }
}
