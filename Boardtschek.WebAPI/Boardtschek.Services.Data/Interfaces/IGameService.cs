using Boardtschek.WebAPI.ViewModels.Game;
using Boardtschek.WebAPI.ViewModels.Rental;

namespace Boardtschek.Services.Data.Interfaces
{
    public interface IGameService
    {
        Task<IEnumerable<GameListViewModel>> GetTheThreeHighestRatedGames();
        Task<IEnumerable<GameListViewModel>> GetTheThreeMostBorrowedGames();
        Task<HomePageGamesOverview> GetGamesForHomePage();
        Task<IEnumerable<GameListViewModel>> GetAllGames();
        Task AddGameAsync(GameFormViewModel model);
        Task<bool> DoesGameExistAsync(string id);
        Task<GameEditViewModel> GetGameEditViewModelAsync(string id);
        Task EditGameAsync(GameEditViewModel model, string id);
        Task DeleteGameAsync(string id);
        Task<bool> IsGameAvailable(RentGameFormViewModel model);
        Task RentGame(RentGameFormViewModel model, string userId);
        Task<IEnumerable<GameListViewModel>> SearchGamesByName(string name);
<<<<<<< Updated upstream
=======
        Task<IEnumerable<GameListViewModel>> GetLikedGamesByUserID(string userId);
        Task<IEnumerable<RentedGameListViewModel>> GetActiveRentedGamesByUserId(string userId);
        Task<IEnumerable<RentedGameListViewModel>> GetOverdueGamesByUserId(string userId);
>>>>>>> Stashed changes
    }
}
