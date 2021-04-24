using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;

namespace TaskManager.API.Common.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JWTTokenValues _jwtTokenValues;

        public JwtMiddleware(RequestDelegate next, IOptions<JWTTokenValues> jwtTokenValuesAccessor)
        {
            _next = next;
            _jwtTokenValues = jwtTokenValuesAccessor.Value;
        }

        public async Task Invoke(HttpContext context, IUserService userService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                attachUserToContext(context, userService, token);

            await _next(context);
        }

        private void attachUserToContext(HttpContext context, IUserService userService, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_jwtTokenValues.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "aud").Value);

                // attach user to context on successful jwt validation
                context.Items["currentUser"] = userService.GetUserById(userId).GetAwaiter().GetResult();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}
