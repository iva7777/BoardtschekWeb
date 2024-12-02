using System.ComponentModel.DataAnnotations;
using static Boardtschek.Common.EntityValidations.Game;

namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class GameFormViewModel
    {
        [Required]
        [StringLength(TitleMaxLength, MinimumLength = TitleMinLength)]
        public string Title { get; set; } = null!;

        [Required]
        [StringLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [StringLength(ImageUrlMaxLength)]
        public string ImageUrl { get; set; } = null!;

        [Required]
        [Range(MinPlayersMinValue, MinPlayersMaxValue)]
        public int MinPlayers { get; set; }

        [Required]
        [Range(MaxPlayersMinValue, MaxPlayersMaxValue)]
        public int MaxPlayers { get; set; }

        [Required]
        [Range(DifficultyLevelMinValue, DifficultyLevelMaxValue)]
        public int DifficultyLevel { get; set; }

        [Required]
        public int TotalQuantity { get; set; }
    }
}
