using Boardtschek.WebAPI.ViewModels.Game;
using Boardtschek.WebAPI.ViewModels.Rental;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
<<<<<<< HEAD
        Task<bool> IsGameAvailable(RentGameFormViewModel model);
        Task RentGame(RentGameFormViewModel model, string userId);
=======
        Task<IEnumerable<GameListViewModel>> SearchGamesByName(string name);
>>>>>>> origin/feature/rent
    }
}
