using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boardtschek.Data.Models
{
    public class Rental
    {
        public Rental()
        {
            Id = Guid.NewGuid();    
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; } = null!;

        [Required]
        public Guid GameId { get; set; }

        [ForeignKey(nameof(GameId))]
        public Game Game { get; set; } = null!;

        [Required]  
        public DateTime RentalDate { get; set; }

        [Required]
        public DateTime ExpectedReturnDate { get; set; }

        public DateTime? ActualReturnDate { get; set; }
    }
}
