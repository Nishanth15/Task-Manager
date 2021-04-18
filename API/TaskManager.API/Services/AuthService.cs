using AutoMapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API.Common;
using TaskManager.API.Common.Constants;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly ICoreRepository _coreRepo;
        private string _secretKey = string.Empty;
        private string _accessTokenExpirationTime = string.Empty;
        private string _refreshTokenExpirationTime = string.Empty;
        private readonly PasswordHelper _passwordHelper;
        private readonly JWTTokenValues _jwtTokenValues; 
        private readonly IMapper _mapper;
        public AuthService(ICoreRepository repo, IMapper mapper, IOptions<JWTTokenValues> jwtTokenValuesAccessor)
        {
            _coreRepo = repo;
            _passwordHelper = new PasswordHelper();
            _mapper = mapper;
            _jwtTokenValues = jwtTokenValuesAccessor.Value;
        }
        public async Task<TokenResponse> GenerateToken(TokenRequest tokenRequest)
        {
            UserDetails userDetails;
            bool isValidUser = false;
            TokenResponse response = new TokenResponse
            {
                Success = false
            };
            if (tokenRequest.GrantType == "Password")
            {
                if (!string.IsNullOrEmpty(tokenRequest.EmailId))
                {
                    _secretKey = _jwtTokenValues.Secret;
                    _accessTokenExpirationTime = _jwtTokenValues.AccessTokenExpirationTime;
                    _refreshTokenExpirationTime = _jwtTokenValues.RefreshTokenExpirationTime;

                    var user = await _coreRepo.GetUserByEmailIdAsync(tokenRequest.EmailId);

                    userDetails = _mapper.Map<User, UserDetails>(user);
                    string salt = _coreRepo.GetUserPasswordByUserId(user.Id).Result.Salt;

                    if (userDetails.Id != Guid.Empty && userDetails.ActivationStatus.Equals(ActivationStatus.Activated))
                    {
                        isValidUser = CheckUserIsValid(tokenRequest, user, salt);
                    }
                    else
                        if (userDetails.Id != Guid.Empty && userDetails.ActivationStatus.Equals(ActivationStatus.Created))
                    {
                        response.ErrorMessage = Constants.UserNotActivated;
                        return response;
                    }
                    else
                    {
                        response.ErrorMessage = Constants.UserNotRegistered;
                        return response;
                    }

                    if (userDetails.Id != Guid.Empty && isValidUser)
                    {
                        var accessTokenResponse = CreateToken(userDetails, Convert.ToInt32(_accessTokenExpirationTime));
                        var refreshTokenResponse = CreateToken(userDetails, Convert.ToInt32(_refreshTokenExpirationTime));

                        response = new TokenResponse
                        {
                            AccessToken = accessTokenResponse.AccessToken,
                            RefreshToken = refreshTokenResponse.RefreshToken,
                            ExpiresAt = accessTokenResponse.ExpiresAt,
                            Success = true,
                            ErrorMessage = Constants.UserAuthenticatedSuccessfully
                        };
                        return response;
                    }
                }
            }
            else
            {
                var handler = new JwtSecurityTokenHandler();
                var refreshToken = handler.ReadJwtToken(tokenRequest.RefreshToken);
                //isAuthorized = CheckExpiry(actionContext, isAuthorized, tokenS);
                var emailId = refreshToken.Claims.First(claim => claim.Type == "unique_name").Value;
                // get User Role
                if (!string.IsNullOrWhiteSpace(emailId))
                {
                    _secretKey = _jwtTokenValues.Secret;
                    _accessTokenExpirationTime = _jwtTokenValues.AccessTokenExpirationTime;
                    var user = await _coreRepo.GetUserByEmailIdAsync(emailId);
                    userDetails = _mapper.Map<User, UserDetails>(user);

                    if (userDetails != null)
                    {
                        string exp = refreshToken.Claims.First(claim => claim.Type == "exp").Value;
                        DateTime unixTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);
                        DateTime expTime = unixTime.AddSeconds(Convert.ToDouble(exp));
                        if (expTime < DateTime.UtcNow)
                        {
                            return null;
                        }
                        else
                        {
                            var refreshtokenResponse = CreateToken(userDetails, Convert.ToInt32(_accessTokenExpirationTime));
                            response = new TokenResponse
                            {
                                AccessToken = refreshtokenResponse.AccessToken,
                                RefreshToken = tokenRequest.RefreshToken,
                                ExpiresAt = refreshtokenResponse.ExpiresAt,
                                Success = true
                            };
                            return response;
                        }
                    }
                }
            }
            return null;
        }

        private TokenResponse CreateToken(UserDetails user, int tokenExpirationTime)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expiresAt = new DateTime();
            var tokenHandler = new JwtSecurityTokenHandler();

            string sNewGuid = user.Id.ToString("n");
            var now = DateTime.UtcNow;
            byte[] eName = Encoding.ASCII.GetBytes(user.EmailId);
            string encryptedName = Convert.ToBase64String(eName);
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
         {
                            new Claim(ClaimTypes.Upn,user.EmailId),
                            new Claim(JwtRegisteredClaimNames.UniqueName,user.EmailId),
                            new Claim(JwtRegisteredClaimNames.GivenName,user.FullName),
                            new Claim(JwtRegisteredClaimNames.Sub, encryptedName),
                            new Claim(JwtRegisteredClaimNames.Aud, user.Id.ToString()),
                            new Claim(JwtRegisteredClaimNames.Iss,"https://localhost:44365/"),
                            new Claim(JwtRegisteredClaimNames.Jti,  sNewGuid),
                            new Claim(JwtRegisteredClaimNames.Exp, now.AddMinutes(tokenExpirationTime).Subtract(now).TotalSeconds.ToString(System.Globalization.CultureInfo.InvariantCulture), ClaimValueTypes.Integer64),
                            new Claim(JwtRegisteredClaimNames.Iat, now.Subtract(now).TotalSeconds.ToString(System.Globalization.CultureInfo.InvariantCulture), ClaimValueTypes.Integer64)
                        });
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.Default.GetBytes(_secretKey));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);
            var expiry = now.AddMinutes(tokenExpirationTime);
            //create the jwt
            var token = tokenHandler.CreateJwtSecurityToken(subject: claimsIdentity, notBefore: issuedAt, expires: expiry, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);
            //calculate Expiration Time
            expiresAt = now.AddMinutes(tokenExpirationTime);
            return new TokenResponse() { AccessToken = tokenString, RefreshToken = tokenString, ExpiresAt = expiresAt };
        }

        private bool CheckUserIsValid(TokenRequest tokenRequest, User user, string salt)
        {
            //To be commented
            byte[] data = Encoding.UTF8.GetBytes(tokenRequest.Password);
            string base64String = Convert.ToBase64String(data);

            var base64EncodedBytes = Convert.FromBase64String(base64String);
            tokenRequest.Password = Encoding.UTF8.GetString(base64EncodedBytes);
            HashWithSaltResult password = _passwordHelper.HashWithSalt(tokenRequest.Password, salt, SHA256.Create());
            if (user.HashedPassword.Equals(password.Digest))
                return true;
            else
                return false;
        }
    }
}
