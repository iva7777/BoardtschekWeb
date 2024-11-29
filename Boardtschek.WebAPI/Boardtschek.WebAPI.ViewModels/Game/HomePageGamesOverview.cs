namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class HomePageGamesOverview
    {
        public IEnumerable<GameListViewModel> HighestRatedGames { get; set; } = new List<GameListViewModel>();
        public IEnumerable<GameListViewModel> MostBorrowedGames { get; set; } = new List<GameListViewModel>();
    }
}
