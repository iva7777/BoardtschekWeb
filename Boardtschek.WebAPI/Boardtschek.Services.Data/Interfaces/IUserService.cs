using Boardtschek.WebAPI.ViewModels.User;

namespace Boardtschek.Services.Data.Interfaces
{
    public interface IUserService
    {
        Task<UserProfileViewModel> GetUserProfileInformation(string userId);
    }
}
