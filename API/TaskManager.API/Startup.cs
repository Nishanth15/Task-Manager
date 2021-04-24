using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using TaskManager.Database;
using TaskManager.API.Services;
using TaskManager.API.Services.Interfaces;
using TaskManager.DataManager;
using TaskManager.DataManager.Interfaces;
using TaskManager.API.Helpers;
using TaskManager.API.DTOs;
using TaskManager.API.Common.Helpers;

namespace TaskManager.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperProfiles));

            services.AddControllers();

            //AppSettings
            services.Configure<JWTTokenValues>(Configuration.GetSection("JWTTokenValues"));


            // Repositories
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<ICoreRepository, CoreRepository>();

            // Services
            services.AddHttpContextAccessor();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ISectionService, SectionService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TaskManager.API", Version = "v1" });
            });

            services.AddDbContext<UserDbContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TaskManager.API v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

          

            app.UseCors("CorsPolicy");

            app.UseAuthorization();
            app.UseAuthentication();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
