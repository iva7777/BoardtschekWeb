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
        [HttpPost]
        [Authorize]
        [Route("Like")]
        public async Task<IActionResult> LikeGame(string gameId)
        {
            try
            {
                bool isGameValid = await gameService.DoesGameExistAsync(gameId);

                if (!isGameValid)
                {
                    return NotFound(new { message = "The game you are trying to like does not exist." });
                }

                string userId = User.GetId();

                bool isGameAlreadyLiked = await gameService.IsGameAlreadyLikedByUserAsync(gameId, userId);

                if (isGameAlreadyLiked)
                {
                    return BadRequest(new { message = "You have already liked this game!" });
                }

                await gameService.LikeGameAsync(gameId, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while deleting the game.", details = ex.Message });
            }
        }
        [HttpGet]
        [Authorize]
        [Route("Details/{gameId}")]
        public async Task<IActionResult> Details(string gameId)
        {
            bool isGameValid = await gameService.DoesGameExistAsync(gameId);

            if (!isGameValid)
            {
                return NotFound(new { message = "The game you are trying to like does not exist." });
            }

            string userId = User.GetId();

            GameDetailsViewModel model = await gameService.GetGameDetailsAsync(gameId, userId);
            return Ok(model);
        }
        [HttpPost]
        [Authorize]
        [Route("Rate/{gameId}")]
        public async Task<IActionResult> Rate(GameRatingFormViewModel model, string gameId)
        {
            try
            {
                bool isGameValid = await gameService.DoesGameExistAsync(gameId);

                if (!isGameValid)
                {
                    return NotFound(new { message = "The game you are trying to like does not exist." });
                }

                string userId = User.GetId();

                bool isGameAlreadyRated = await gameService.IsGameAlreadyRatedByUserAsync(gameId, userId);

                if (isGameAlreadyRated)
                {
                    return BadRequest(new { message = "You have already rated this game!" });
                }

                await gameService.RateGame(model, gameId, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while deleting the game.", details = ex.Message });
            }
        }
    }
}
