using Boardtschek.Data;
using Boardtschek.Services.Data.Interfaces;

namespace Boardtschek.Services.Data
{
    public class GameService : IGameService
    {
        private readonly BoardtschekDbContext dbContext;

        public GameService(BoardtschekDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
