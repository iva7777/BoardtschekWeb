using Boardtschek.Services.Data;
using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.Infrastructure.Extensions;
using Boardtschek.WebAPI.ViewModels.Game;
using Boardtschek.WebAPI.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace Boardtschek.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IGameService gameService;
        private readonly IUserService userService;
        public HomeController(IGameService gameService, IUserService userService)
        {
            this.gameService = gameService;
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            HomePageGamesOverview model = await gameService.GetGamesForHomePage();
            return Ok(model);
        }

        [HttpGet()]
        [Route("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                string userId = User.GetId();
                UserProfileViewModel model = await userService.GetUserProfileInformation(userId);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
