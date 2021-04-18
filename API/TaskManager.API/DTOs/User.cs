using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.API.DTOs
{
    public class UserDetails
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public ActivationStatus ActivationStatus { get; set; }
        public ResetPasswordStatus ResetPassword { get; set; }
    }

    public enum ResetPasswordStatus
    {
        Requested = 0,
        Changed = 1,
    }

    public enum ActivationStatus
    {
        Created = 1,
        Activated = 2,
        DeActivated = 3
    }

    public class HashWithSaltResult
    {
        public string Salt { get; }
        public string Digest { get; set; }
        public HashWithSaltResult(string salt, string digest)
        {
            Salt = salt;
            Digest = digest;
        }
    }

    public class SignUpRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string PhoneNo { get; set; }
    }
    public class SignUpResponse : BaseResponse
    {
        public UserDetails user { get; set; }
    }
}
