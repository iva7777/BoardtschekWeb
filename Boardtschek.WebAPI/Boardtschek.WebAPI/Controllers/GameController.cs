﻿using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.Infrastructure.Extensions;
using Boardtschek.WebAPI.ViewModels.Game;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    }
}