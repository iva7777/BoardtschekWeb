using Boardtschek.Services.Data;
using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.Infrastructure.Extensions;
using Boardtschek.WebAPI.ViewModels.Rental;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Boardtschek.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly IGameService gameService;
        private readonly IRentalService rentalService;
        public RentalController(IGameService gameService, IRentalService rentalService)
        {
            this.gameService = gameService;
            this.rentalService = rentalService;
        }


        [HttpPost]
        [Route("Rent/{id}")]
        public async Task<IActionResult> Rent(RentGameFormViewModel model, string id)
        {
            try
            {
                // Validate if the game exists
                bool isGameValid = await gameService.DoesGameExistAsync(id);

                if (!isGameValid)
                {
                    return NotFound(new { message = "The game you are trying to rent does not exist." });
                }

                // Check that the rental start date is not in the past
                if (model.StartDate < DateTime.UtcNow)
                {
                    return BadRequest(new { message = "Start date cannot be in the past" });
                }

                // Check that the return date is after the rental start date
                if (model.EndDate < model.StartDate)
                {
                    return BadRequest(new { message = "End date must be after start date" });
                }

                // Ensure the start time is before the end time
                if (model.StartTime >= model.EndTime && model.EndDate == model.StartDate)
                {
                    return BadRequest(new { message = "Start time must be before end time on the same day." });
                }

                // Check if the game is available for the requested period and quantity
                bool isGameAvailable = await gameService.IsGameAvailable(model, id);

                if (!isGameAvailable)
                {
                    return BadRequest(new { message = "The game is not available for the requested period and quantity." });
                }

                // Get the user ID (assuming you have a method for that)
                string userId = User.GetId();

                // Rent the game (this will include updating the rental records in the database)
                await gameService.RentGame(model, userId, id);

                return Ok(new { message = "Game rented successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while renting the game.", details = ex.Message });
            }
        }

        [HttpPost]
        [Route("Return/{rentalId}")]
        public async Task<IActionResult> ReturnGame(string rentalId)
        {
            try
            {
                // Retrieve the rental record using rentalId
                var rental = await rentalService.GetRentalById(rentalId);

                if (rental == null)
                {
                    return NotFound(new { message = "The rental record does not exist or has already been returned." });
                }

                // Set the ActualReturnDate to the current date
                rental.ActualReturnDate = DateTime.Now;

                // Update the rental record in the database
                await rentalService.UpdateRental(rental);

                return Ok(new { message = "You have successfully returned the game!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while returning the game.", details = ex.Message });
            }
        }

    }
}
