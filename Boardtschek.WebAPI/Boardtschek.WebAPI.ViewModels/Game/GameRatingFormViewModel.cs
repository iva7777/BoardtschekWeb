using System.ComponentModel.DataAnnotations;
using static Boardtschek.Common.EntityValidations.Rating;

namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class GameRatingFormViewModel
    {
        [Required]
        [Range(ScoreMinValue, ScoreMaxValue)]
        public int Score { get; set; }


        [StringLength(CommentMaxLength)]
        public string? Comment { get; set; }
    }
}
