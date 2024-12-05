using System.ComponentModel.DataAnnotations;

namespace Boardtschek.WebAPI.ViewModels.Rental
{
    public class RentGameFormViewModel
    {
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        [Required]
        [Range(1,5)]
        public int Quantity { get; set; }
    }
}
