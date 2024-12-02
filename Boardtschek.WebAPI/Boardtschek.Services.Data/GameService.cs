using Boardtschek.Data;
using Boardtschek.Data.Models;
using Boardtschek.Data.Models.Enums;
using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.ViewModels.Game;
using Microsoft.EntityFrameworkCore;

namespace Boardtschek.Services.Data
{
    public class GameService : IGameService
    {
        private readonly BoardtschekDbContext dbContext;

        public GameService(BoardtschekDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddGameAsync(GameFormViewModel model)
        {
            Game game = new()
            { 
                Title = model.Title,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                MinPlayers = model.MinPlayers,
                MaxPlayers = model.MaxPlayers,
                DifficultyLevel = (Difficulty) model.DifficultyLevel,
                TotalQuantity = model.TotalQuantity,
                AvailableQuantity = model.TotalQuantity
            };

            await dbContext.Games.AddAsync(game);
            await dbContext.SaveChangesAsync();
        }

        public async Task<HomePageGamesOverview> GetGamesForHomePage()
        {
            HomePageGamesOverview gamesOverview = new HomePageGamesOverview();
            gamesOverview.HighestRatedGames = await GetTheThreeHighestRatedGames();
            gamesOverview.MostBorrowedGames = await GetTheThreeMostBorrowedGames();
            return gamesOverview;
        }

        public async Task<IEnumerable<GameListViewModel>> GetTheThreeHighestRatedGames()
        {
            IEnumerable<GameListViewModel> topRatedGames = await dbContext.Games
                .Where(g => g.Ratings.Any())
                    .Select(g => new
                    {
                        Game = g,
                        AverageRating = g.Ratings.Average(r => r.Score)
                    })
                .OrderByDescending(g => g.AverageRating)
                .Take(3)
                .Select(g => new GameListViewModel
                {
                    Id = g.Game.Id.ToString(),
                    Title = g.Game.Title,
                    ImageUrl = g.Game.ImageUrl
                }).ToListAsync();

            return topRatedGames;
        }

        public async Task<IEnumerable<GameListViewModel>> GetTheThreeMostBorrowedGames()
        {
            IEnumerable<GameListViewModel> topBorrowedGames = await dbContext.Rentals
                .GroupBy(r => r.Game)
                .Select(g => new
                {
                    Game = g.Key,
                    BorrowCount = g.Count()
                })
                .OrderByDescending(g => g.BorrowCount)
                .Take(3)
                .Select(g => new GameListViewModel
                {
                    Id = g.Game.Id.ToString(),
                    Title = g.Game.Title,
                    ImageUrl = g.Game.ImageUrl
                })
                .ToListAsync();

            return topBorrowedGames;
        }
    }
}
