using learn.Repositories;
using learn.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using learn.EFDB;
using System;
using Microsoft.EntityFrameworkCore;

namespace learn
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            
            //使用UserSecrets設定連接字串
            //services.AddTransient<TestSecretRepository>();
            services.AddDbContext<UserSecretDbContext>(options => 
                options.UseOracle(Configuration.GetConnectionString("MyTestSecretConnection"))
            );
            

            //增加後端的服務需要在此處設定..否則會出現找不到後端服務的異常
            services.AddScoped<UserRepository>();
            services.AddScoped<UserService>();
            services.AddScoped<EFUserService>();
            services.AddScoped<EFUserRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                
                

                if (env.IsDevelopment())
                {
                    //将超时配置为1分30秒，以避免“ Angular CLI进程未在50秒的超时时间内开始监听请求”。
                    spa.Options.StartupTimeout = new TimeSpan(0,1,30); //1分30秒

                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
