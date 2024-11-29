using Boardtschek.Services.Data.Interfaces;
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
    }
}
