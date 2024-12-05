using Boardtschek.Data;
using Boardtschek.Data.Models;
using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.ViewModels.User;
using Microsoft.EntityFrameworkCore;

namespace Boardtschek.Services.Data
{
    public class UserService : IUserService
    {
        private readonly BoardtschekDbContext dbContext;
        private readonly IGameService gameService;
        public UserService(BoardtschekDbContext dbContext, IGameService gameService)
        {
            this.dbContext = dbContext;
            this.gameService = gameService;
        }

        public async Task<UserProfileViewModel> GetUserProfileInformation(string userId)
        {
            AppUser user = await dbContext.Users.FirstAsync(u => u.Id.ToString() == userId);

            UserProfileViewModel model = new()
            { 
                FirstName = user.FirstName,
                LastName = user.LastName,
                ImageUrl = user.ImageUrl,
                LikedGames = await gameService.GetLikedGamesByUserID(userId),
                ActiveRentedGames = await gameService.GetActiveRentedGamesByUserId(userId),
                OverdueRentedGames = await gameService.GetOverdueGamesByUserId(userId)
            };

            return model;
        }
    }
}
