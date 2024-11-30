using Boardtschek.Data;
using Boardtschek.Data.Models;
using Boardtschek.Services.Data;
using Boardtschek.Services.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Boardtschek.WebAPI.Infrastructure.Extensions;
using static Boardtschek.Common.EntityValidations.GeneralApplicationConstants;
using Microsoft.AspNetCore.Identity;


namespace Boardtschek.WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<BoardtschekDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            }
                );

            builder.Services.AddAuthorization();


            builder.Services.AddIdentityApiEndpoints<AppUser>(options =>
            {
                options.Password.RequiredLength = 5;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            })
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<BoardtschekDbContext>();

            builder.Services.AddScoped<IGameService, GameService>();
            builder.Services.AddScoped<IRatingService, RatingService>();
            builder.Services.AddScoped<IRentalService, RentalService>();

            var app = builder.Build();



            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.MapIdentityApi<AppUser>();

            app.UseHttpsRedirection();


            app.UseAuthorization();

            await app.SeedAdministrator(DevelopmentAdminEmail);

            app.MapControllers();

            app.Run();
        }
    }
}
