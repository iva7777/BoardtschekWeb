namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class GameListViewModel
    {
        public string Id { get; set; } = null!;

        public string Title { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

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
