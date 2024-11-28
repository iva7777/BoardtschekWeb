using Boardtschek.Data.Models.Enums;
using System.ComponentModel.DataAnnotations;
using static Boardtschek.Common.EntityValidations.Game;

namespace Boardtschek.Data.Models
{
    public class Game
    {
        public Game()
        {
            Id = Guid.NewGuid();    
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [MaxLength(ImageUrlMaxLength)]
        public string ImageUrl { get; set; } = null!;

        public int MinPlayers { get; set; }

        public int MaxPlayers { get; set; }

        public Difficulty DifficultyLevel { get; set; }

        public int AvailableQuantity { get; set; }

        public int TotalQuantity { get; set; }

        public ICollection<LikedGame> LikedGames { get; set; } = new List<LikedGame>();

        public ICollection<Rental> Rentals { get; set; } = new List<Rental>();

        public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }
}
