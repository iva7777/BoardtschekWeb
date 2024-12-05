using Boardtschek.Data;
using Boardtschek.Data.Models;
using Boardtschek.Services.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Boardtschek.Services.Data
{
    public class RentalService : IRentalService
    {
        private readonly BoardtschekDbContext dbContext;

        public RentalService(BoardtschekDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Rental?> GetRentalById(string rentalId)
        {
            if (!Guid.TryParse(rentalId, out var rentalGuid))
            {
                return null; 
            }

            var rental = await dbContext.Rentals
                .FirstOrDefaultAsync(r => r.Id == rentalGuid && r.ActualReturnDate == null);  

            return rental;
        }
        public async Task UpdateRental(Rental rental)
        {
            dbContext.Rentals.Update(rental);
            await dbContext.SaveChangesAsync();
        }
    }
}
