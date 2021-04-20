using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API.Common;
using TaskManager.API.Common.Constants;
using TaskManager.API.DTOs;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Services.Interfaces
{
    public class UserService:IUserService
    {
        public readonly ICoreRepository _coreRepo;
        private readonly IMapper _mapper;

        public UserService(ICoreRepository coreRepo, IMapper mapper)
        {
            _coreRepo = coreRepo;
            _mapper = mapper;
        }

        //User Registration
        public async Task<SignUpResponse> SignUp(SignUpRequest signUpRequest)
        {
            SignUpResponse response = new SignUpResponse
            {
                Success = false
            };
            //var user = await _coreRepo.GetUserByEmailId(signUpRequest.EmailId);
            //if (user.EmailId != null)
            //{
            //    response.Message = Constants.UserAlreadyRegistered;
            //    return response;
            //}
            var user = _mapper.Map<SignUpRequest, User>(signUpRequest);
            user.FullName = signUpRequest.FirstName + ' ' + signUpRequest.LastName;
            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;
            user.ResetPassword = (int)ResetPasswordStatus.Requested;
            user.ActivationStatus = (int)ActivationStatus.Created;

            HashWithSaltResult hashWithSaltResult = GetHashWithSaltResult(signUpRequest.Password);
            user.HashedPassword = hashWithSaltResult.Digest;

            user = await _coreRepo.AddUser(user);

            if (user != null && user.Id != Guid.Empty)
            {
                var userPassword = new UserPassword
                {
                    Id = Guid.NewGuid(),
                    Salt = hashWithSaltResult.Salt,
                    UserId = user.Id
                };
                await _coreRepo.AddUserPassword(userPassword);
                //var result = SendActivationEmailAsync(signUpRequest.EmailId, userId, signUpRequest.BaseUrl);
                response.Success = true;
                response.Message = Constants.UserCreatedSuccessfully;
                response.user = _mapper.Map<User, UserDetails>(user);
            }
            else
            {
                response.Success = false;
                response.Message = Constants.ServerError;
            }
            return response;
        }
        private HashWithSaltResult GetHashWithSaltResult(string password)
        {
            PasswordHelper passwordHelper = new PasswordHelper();

            //To be commented
            byte[] data = Encoding.UTF8.GetBytes(password);
            string base64String = Convert.ToBase64String(data);
            //Hash Password
            var base64EncodedBytes = Convert.FromBase64String(base64String);
            password = Encoding.UTF8.GetString(base64EncodedBytes);

            byte[] saltbyte = passwordHelper.GenerateRandomCryptographicBytes(16);
            HashWithSaltResult hashWithSaltResult = passwordHelper.HashWithSalt(password, Convert.ToBase64String(saltbyte), SHA256.Create());

            return hashWithSaltResult;
        }
        //Manage Users
        public UserDetails GetUserById(Guid userId)
        {
            return new UserDetails()
            {
                FirstName = "Nishanth",
                Id = Guid.NewGuid(),
                LastName = "Prabhakaran",
                ActivationStatus = ActivationStatus.Activated,
                EmailId = "nishanthprabhakaran1998@gmail.com",
                FullName = "Nishanth Prabhakaran",
                PhoneNo = "9787222002",
                ResetPassword = ResetPasswordStatus.Requested,
                LastLoggedIn = DateTime.UtcNow
            };
        }
    }
}
