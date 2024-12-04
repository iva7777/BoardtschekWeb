using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.Infrastructure.Extensions;
using Boardtschek.WebAPI.ViewModels.Game;
using Boardtschek.WebAPI.ViewModels.Rental;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Boardtschek.Common.EntityValidations.GeneralApplicationConstants;

namespace Boardtschek.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService gameService;

        public GameController(IGameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpGet]
        [Authorize]
        [Route("All")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var games = await gameService.GetAllGames();
                return Ok(games);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while retrieving all games.", details = ex.Message });
            }
        }


        [HttpGet]
        [Authorize(Roles = AdminRoleName)]
        [Route("Add")]
        public async Task<IActionResult> Add()
        {
            if (!User.isAdmin())
            {
                return Unauthorized();
            }

            try
            {
                GameFormViewModel model = new();
                return Ok(model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while adding the game." });
            }
        }


        [HttpPost]
        [Authorize(Roles = AdminRoleName)]
        [Route("Add")]
        public async Task<IActionResult> Add(GameFormViewModel model)
        {
            if (!User.isAdmin())
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.MaxPlayers < model.MinPlayers || model.MinPlayers > model.MaxPlayers)
            { 
                return BadRequest(new { message = "MaxPlayers cannot be less than MinPlayers. Please provide valid input." });
            }

            try
            {
                await gameService.AddGameAsync(model);
                return Ok($"You have successfully added {model.Title}!");
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while adding the game." });
            }
        }

        [HttpGet]
        [Authorize(Roles = AdminRoleName)]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(string id)
        {
            if (!User.isAdmin())
            {
                return Unauthorized();
            }


            try
            {
                var game = await gameService.GetGameEditViewModelAsync(id);

                if (game == null)
            {
                return NotFound(new { message = "The game you are trying to edit does not exist." });
            }

            return Ok(game);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while adding the game." });
            }
        }

        [HttpPost]
        [Authorize(Roles = AdminRoleName)]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(GameEditViewModel model, string id)
        {
            if (!User.isAdmin())
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.MaxPlayers < model.MinPlayers || model.MinPlayers > model.MaxPlayers)
            {
                return BadRequest(new { message = "MaxPlayers cannot be less than MinPlayers. Please provide valid input." });
            }

            if (model.AvailableQuantity > model.TotalQuantity)
            {
                return BadRequest(new { message = "Available quantity cannot be more than Total quantity. Please provide valid input." });
            }

            try
            {
                bool isGameValid = await gameService.DoesGameExistAsync(id);

                if (!isGameValid)
                {
                    return NotFound(new { message = "The game you are trying to edit does not exist." });
                }

                await gameService.EditGameAsync(model, id);
                return Ok($"You have successfully edited {model.Title}!");
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while adding the game." });
            }
        }

        [HttpDelete]
        [Authorize(Roles = AdminRoleName)]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!User.isAdmin())
            {
                return Unauthorized();
            }

            try
            {
                bool isGameValid = await gameService.DoesGameExistAsync(id);

                if (!isGameValid)
                {
                    return NotFound(new { message = "The game you are trying to delete does not exist." });
                }

                await gameService.DeleteGameAsync(id);
                return Ok(new { message = $"You have successfully deleted the game!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while deleting the game.", details = ex.Message });
            }
        }

<<<<<<< HEAD

        [HttpPost]
        [Route("Rent/{id}")]
        public async Task<IActionResult> Rent(RentGameFormViewModel model)
        {
            try
            {
                bool isGameValid = await gameService.DoesGameExistAsync(model.GameId);

                if (!isGameValid)
                {
                    return NotFound(new { message = "The game you are trying to delete does not exist." });
                }

                if (model.StartDate < DateTime.UtcNow)
                {
                    return BadRequest(new { message = "ExpectedRentDate cannot be in the past" });
                }

                if (model.EndDate <= model.StartDate)
                {
                    return BadRequest(new { message = "ExpectedReturnDate must be after ExpectedRentDate" });
                }

                if (model.StartTime >= model.EndTime)
                {
                    return BadRequest(new { message = "Invalid time range: ExpectedStartTime must be before ExpectedEndTime." });
                }

                bool isGameAvailable = await gameService.IsGameAvailable(model);

                if (!isGameAvailable)
                {
                    return BadRequest(new { message = "The game is not available for the requested period and quantity." });
                }

                string userId = User.GetId();
                await gameService.RentGame(model, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while deleting the game.", details = ex.Message });
            }
        }
=======
        [HttpGet]
        [Authorize]
        [Route("Search")]
        public async Task<IActionResult> SearchGamesByName([FromQuery] string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                {
                    return BadRequest(new { message = "Search term cannot be empty." });
                }

                var games = await gameService.SearchGamesByName(name);

                if (!games.Any())
                {
                    return NotFound(new { message = "No games found matching the search term." });
                }

                return Ok(games);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while searching for games.", details = ex.Message });
            }
        }

>>>>>>> origin/feature/rent
    }
}
