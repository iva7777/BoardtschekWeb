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
        Task<bool> IsGameAvailable(RentGameFormViewModel model, string gameId);
        Task RentGame(RentGameFormViewModel model, string userId, string gameId);
        Task<IEnumerable<GameListViewModel>> SearchGamesByName(string name);
        Task<IEnumerable<GameListViewModel>> GetLikedGamesByUserID(string userId);
        Task<IEnumerable<RentedGameListViewModel>> GetActiveRentedGamesByUserId(string userId);
        Task<IEnumerable<RentedGameListViewModel>> GetOverdueGamesByUserId(string userId);
        Task<bool> IsGameAlreadyLikedByUserAsync(string gameId, string userId);
        Task LikeGameAsync(string gameId, string userId); 
        Task<bool> IsGameAlreadyRatedByUserAsync(string gameId, string userId);
        Task RateGame(GameRatingFormViewModel model, string gameId, string userId);
        Task<GameDetailsViewModel> GetGameDetailsAsync(string gameId, string userId);
    }
}
