using Boardtschek.WebAPI.ViewModels.Game;

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
        Task<IEnumerable<GameListViewModel>> SearchGamesByName(string name);
    }
}
