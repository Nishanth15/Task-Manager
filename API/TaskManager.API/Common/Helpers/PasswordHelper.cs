using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Common
{
    public class PasswordHelper
    {
        public byte[] GenerateRandomCryptographicBytes(int keyLength)
        {
            RNGCryptoServiceProvider rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            byte[] randomBytes = new byte[keyLength];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            return randomBytes;
        }
        public HashWithSaltResult HashWithSalt(string password, string salt, HashAlgorithm hashAlgo)
        {
            var passwordWithSalt = string.Concat(password, salt);
            byte[] passwordWithSaltBytes = Encoding.UTF8.GetBytes(passwordWithSalt);
            byte[] digestBytes = hashAlgo.ComputeHash(passwordWithSaltBytes);
            return new HashWithSaltResult(salt, Convert.ToBase64String(digestBytes));
        }
    }
}
