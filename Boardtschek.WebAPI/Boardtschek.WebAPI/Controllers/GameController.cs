using Boardtschek.Services.Data.Interfaces;
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
                //Error
            }

            if (model.MaxPlayers < model.MinPlayers || model.MinPlayers > model.MaxPlayers)
            { 
                return BadRequest(new { message = "MaxPlayers cannot be less than MinPlayers. Please provide valid input." });
            }

            try
            {
                return Ok(model);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while adding the game." });
            }
        }
    }
}
