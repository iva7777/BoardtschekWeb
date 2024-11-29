using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.ViewModels.Game;
using Microsoft.AspNetCore.Mvc;

namespace Boardtschek.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IGameService gameService;
        public HomeController(IGameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            HomePageGamesOverview model = await gameService.GetGamesForHomePage();
            return Ok(model);
        }
    }
}
