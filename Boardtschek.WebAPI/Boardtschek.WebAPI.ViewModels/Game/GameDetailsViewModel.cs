namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class GameDetailsViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Difficulty { get; set; } = null!;

        public IEnumerable<RatingViewModel> Ratings { get; set; } = new HashSet<RatingViewModel>();

        public double AverageRating
        {
            get
            {
                if (Ratings.Any())
                {
                    return Ratings.Average(r => r.Score);
                }
                else
                {
                    return 0;
                }
            }
        }

    }
}