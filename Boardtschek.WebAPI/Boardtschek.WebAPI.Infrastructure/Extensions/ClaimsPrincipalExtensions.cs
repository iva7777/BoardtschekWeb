using System.Security.Claims;
using static Boardtschek.Common.EntityValidations.GeneralApplicationConstants;

namespace Boardtschek.WebAPI.Infrastructure.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetId(this ClaimsPrincipal user)
        {
            return user?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public static bool isAdmin(this ClaimsPrincipal user)
        {
            return user.IsInRole(AdminRoleName);
        }
    }
}
