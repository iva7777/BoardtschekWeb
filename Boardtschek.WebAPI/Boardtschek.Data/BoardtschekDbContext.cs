using Boardtschek.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Boardtschek.Data
{
    public class BoardtschekDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        public BoardtschekDbContext(DbContextOptions<BoardtschekDbContext> options) : base(options)
        {
            
        }

        public DbSet<Game> Games { get; set; } = null!;
        public DbSet<Rental> Rentals { get; set; } = null!;
        public DbSet<Rating> Ratings { get; set; } = null!;
        public DbSet<LikedGame> LikedGames { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Mapping table
            builder.Entity<LikedGame>()
                .HasKey(fg => new { fg.UserId, fg.GameId });

            builder.Entity<LikedGame>()
                .HasOne(fg => fg.User)
                .WithMany(u => u.LikedGames)
                .HasForeignKey(fg => fg.UserId);

            builder.Entity<LikedGame>()
                .HasOne(fg => fg.Game)
                .WithMany(g => g.LikedGames)
                .HasForeignKey(fg => fg.GameId);

            //Mapping table
            builder.Entity<Rating>()
                .HasKey(fg => new { fg.UserId, fg.GameId });

            builder.Entity<Rating>()
                .HasOne(fg => fg.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(fg => fg.UserId);

            builder.Entity<Rating>()
                .HasOne(fg => fg.Game)
                .WithMany(g => g.Ratings)
                .HasForeignKey(fg => fg.GameId);

            //Mapping table
            builder.Entity<Rental>()
        .HasKey(r => r.Id);

            builder.Entity<Rental>()
                .HasOne(fg => fg.User)
                .WithMany(u => u.Rentals)
                .HasForeignKey(fg => fg.UserId);

            builder.Entity<Rental>()
                .HasOne(fg => fg.Game)
                .WithMany(g => g.Rentals)
                .HasForeignKey(fg => fg.GameId);

            builder.Entity<Rental>()
        .HasIndex(r => new { r.UserId, r.GameId })
        .IsUnique(false);


            //Delete
            builder.Entity<Rating>()
                .HasOne(r => r.Game)
                .WithMany(g => g.Ratings)
                .HasForeignKey(r => r.GameId)
                .OnDelete(DeleteBehavior.Cascade); 

            builder.Entity<LikedGame>()
                .HasOne(lg => lg.Game)
                .WithMany(g => g.LikedGames)
                .HasForeignKey(lg => lg.GameId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Rental>()
                .HasOne(r => r.Game)
                .WithMany(g => g.Rentals)
                .HasForeignKey(r => r.GameId)
                .OnDelete(DeleteBehavior.Restrict);


            base.OnModelCreating(builder);
        }
    }
}
