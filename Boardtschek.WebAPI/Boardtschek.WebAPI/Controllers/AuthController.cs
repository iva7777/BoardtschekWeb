using System.Data;
using System.Security.Claims;
using Boardtschek.Data.Models;
using Boardtschek.WebAPI.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Boardtschek.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;


        public AuthController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
 
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                ImageUrl = model.ImageUrl
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok("User registered successfully.");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var passwordCheck = await _userManager.CheckPasswordAsync(user, model.CurrentPassword);
            if (!passwordCheck)
            {
                return BadRequest("Current password is incorrect.");
            }

            if (model.NewPassword != model.ConfirmPassword)
            {
                return BadRequest("New password and confirmation password do not match.");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Password changed successfully.");
        }
        [HttpGet("user")]
        [Authorize] 
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
               
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return Unauthorized("User not authenticated.");
                }

                
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                
                var userProfile = new
                {
                    Avatar = user.ImageUrl,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    LikedGames = user.LikedGames.Select(g => new
                    {
                        g.Game?.Title, 
                    }),
                    Rentals = user.Rentals.Select(r => new
                    {
                       
                        r.Game?.Title,
                        r.RentalDate,  
                        r.ActualReturnDate
                    }),
                    Ratings = user.Ratings.Select(r => new
                    {
                        r.Score,
                        r.Comment,
                        r.RatingDate,
                        r.Game?.Title
                    })
                };

                return Ok(userProfile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

}


