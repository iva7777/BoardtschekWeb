namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class RatingViewModel
    {
        public string Username { get; set; } = null!;

        public int Score { get; set; }

        public string? Comment { get; set; }

        public string DateCreated { get; set; } = null!;
    }
}