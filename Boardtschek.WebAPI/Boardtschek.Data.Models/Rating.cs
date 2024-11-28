using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Boardtschek.Common.EntityValidations.Rating;

namespace Boardtschek.Data.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; } = null!;

        [Required]
        public Guid GameId { get; set; }

        [ForeignKey(nameof(GameId))]
        public Game Game { get; set; } = null!;

        [Required]
        public int Score { get; set; }

        [MaxLength(CommentMaxLength)]
        public string? Comment { get; set; }

        public DateTime RatingDate { get; set; }
    }
}
