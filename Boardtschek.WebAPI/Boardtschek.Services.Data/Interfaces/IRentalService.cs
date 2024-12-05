using Boardtschek.Data.Models;
using Boardtschek.WebAPI.ViewModels.Rental;

namespace Boardtschek.Services.Data.Interfaces
{
    public interface IRentalService
    {
        Task<Rental?> GetRentalById(string rentalId);
        Task UpdateRental(Rental rental);
    }
}
