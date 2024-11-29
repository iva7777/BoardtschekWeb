using Boardtschek.Data;
using Boardtschek.Services.Data.Interfaces;

namespace Boardtschek.Services.Data
{
    public class RentalService : IRentalService
    {
        private readonly BoardtschekDbContext dbContext;
        public RentalService(BoardtschekDbContext dbContext)
        {
            this.dbContext = dbContext; 
        }
    }
}
