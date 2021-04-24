using System;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.Model
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNo { get; set; }
        public string EmailId { get; set; }
        public int ActivationStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public string HashedPassword { get; set; }
        public int ResetPassword { get; set; }
    }
}
