using Boardtschek.Data;
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
    }
}
