using Boardtschek.Data;
using Boardtschek.Services.Data.Interfaces;

namespace Boardtschek.Services.Data
{
    public class RatingService : IRatingService
    {
        private readonly BoardtschekDbContext dbContext;
        public RatingService(BoardtschekDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
