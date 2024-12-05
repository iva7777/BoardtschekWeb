using Boardtschek.WebAPI.ViewModels.Game;

namespace Boardtschek.WebAPI.ViewModels.User
{
    public class UserProfileViewModel
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public IEnumerable<RentedGameListViewModel> ActiveRentedGames { get; set; } = new HashSet<RentedGameListViewModel>();
        public IEnumerable<RentedGameListViewModel> OverdueRentedGames { get; set; } = new HashSet<RentedGameListViewModel>();
        public IEnumerable<GameListViewModel> LikedGames { get; set; } = new HashSet<GameListViewModel>();
    }
}
