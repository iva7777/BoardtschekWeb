using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using static Boardtschek.Common.EntityValidations.AppUser;

namespace Boardtschek.Data.Models
{
    public class AppUser : IdentityUser<Guid>
    {
        [Required]
        [MaxLength(FirstNameMaxLength)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(LastNameMaxLength)]
        public string LastName { get; set; } = null!;

        [Required]
        [MaxLength(ImageUrlMaxLength)]
        public string ImageUrl { get; set; } = null!;

        // Navigation property for LikedGame
        public ICollection<LikedGame> LikedGames { get; set; } = new List<LikedGame>();

        // Navigation property for Rental
        public ICollection<Rental> Rentals { get; set; } = new List<Rental>();

        // Navigation property for Rating
        public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }
}
