using Boardtschek.Data;
using Boardtschek.Data.Models;
using Boardtschek.Data.Models.Enums;
using Boardtschek.Services.Data.Interfaces;
using Boardtschek.WebAPI.ViewModels.Game;
using Boardtschek.WebAPI.ViewModels.Rental;
using Microsoft.EntityFrameworkCore;

namespace Boardtschek.Services.Data
{
    public class GameService : IGameService
    {
        private readonly BoardtschekDbContext dbContext;

        public GameService(BoardtschekDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<GameListViewModel>> GetAllGames()
        {
            IEnumerable<GameListViewModel> allGames = await dbContext.Games
                .Select(g => new GameListViewModel
                {
                    Id = g.Id.ToString(),
                    Title = g.Title,
                    ImageUrl = g.ImageUrl
                })
                .ToListAsync();

            return allGames;
        }

        public async Task AddGameAsync(GameFormViewModel model)
        {
            Game? existingGame = await dbContext.Games.FirstOrDefaultAsync(g => g.Title == model.Title);


            if (existingGame != null)
            {
                existingGame.TotalQuantity += 1;
                await dbContext.SaveChangesAsync();
            }
            else
            {
                Game game = new()
                {
                    Title = model.Title,
                    Description = model.Description,
                    ImageUrl = model.ImageUrl,
                    MinPlayers = model.MinPlayers,
                    MaxPlayers = model.MaxPlayers,
                    DifficultyLevel = (Difficulty)model.DifficultyLevel,
                    TotalQuantity = model.TotalQuantity,
                    AvailableQuantity = model.TotalQuantity
                };

                await dbContext.Games.AddAsync(game);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteGameAsync(string id)
        {
            Game game = await dbContext.Games.FirstAsync(g => g.Id.ToString() == id);
            dbContext.Games.Remove(game);
            await dbContext.SaveChangesAsync();
        }

        public async Task<bool> DoesGameExistAsync(string id)
        {
            return await dbContext.Games.AnyAsync(g => g.Id.ToString() == id);
        }

        public async Task EditGameAsync(GameEditViewModel model, string id)
        {
            Game game = await dbContext.Games.FirstAsync(g => g.Id.ToString() == id);
            game.Title = model.Title;
            game.Description = model.Description;
            game.ImageUrl = model.ImageUrl;
            game.MinPlayers = model.MinPlayers;
            game.MaxPlayers = model.MaxPlayers;
            game.DifficultyLevel = (Difficulty) model.DifficultyLevel;
            game.TotalQuantity = model.TotalQuantity;
            game.AvailableQuantity = model.AvailableQuantity;

            await dbContext.SaveChangesAsync();
        }

        public async Task<GameEditViewModel?> GetGameEditViewModelAsync(string id)
        {
            Game? game = await dbContext.Games.FirstOrDefaultAsync(g => g.Id.ToString() == id);

            if (game == null)
            {
                return null;
            }

            GameEditViewModel model = new()
            { 
                Title = game.Title,
                Description = game.Description,
                ImageUrl = game.ImageUrl,
                MinPlayers = game.MinPlayers,
                MaxPlayers = game.MaxPlayers,
                DifficultyLevel = (int) game.DifficultyLevel,
                TotalQuantity = game.TotalQuantity,
                AvailableQuantity = game.AvailableQuantity
            };

            return model;
        }

        public async Task<HomePageGamesOverview> GetGamesForHomePage()
        {
            HomePageGamesOverview gamesOverview = new HomePageGamesOverview();
            gamesOverview.HighestRatedGames = await GetTheThreeHighestRatedGames();
            gamesOverview.MostBorrowedGames = await GetTheThreeMostBorrowedGames();
            return gamesOverview;
        }

        public async Task<IEnumerable<GameListViewModel>> GetTheThreeHighestRatedGames()
        {
            IEnumerable<GameListViewModel> topRatedGames = await dbContext.Games
                .Where(g => g.Ratings.Any())
                    .Select(g => new
                    {
                        Game = g,
                        AverageRating = g.Ratings.Average(r => r.Score)
                    })
                .OrderByDescending(g => g.AverageRating)
                .Take(3)
                .Select(g => new GameListViewModel
                {
                    Id = g.Game.Id.ToString(),
                    Title = g.Game.Title,
                    ImageUrl = g.Game.ImageUrl
                }).ToListAsync();

            return topRatedGames;
        }

        public async Task<IEnumerable<GameListViewModel>> GetTheThreeMostBorrowedGames()
        {
            IEnumerable<GameListViewModel> topBorrowedGames = await dbContext.Rentals
                .GroupBy(r => r.Game)
                .Select(g => new
                {
                    Game = g.Key,
                    BorrowCount = g.Count()
                })
                .OrderByDescending(g => g.BorrowCount)
                .Take(3)
                .Select(g => new GameListViewModel
                {
                    Id = g.Game.Id.ToString(),
                    Title = g.Game.Title,
                    ImageUrl = g.Game.ImageUrl
                })
                .ToListAsync();

            return topBorrowedGames;
        }

        public async Task<bool> IsGameAvailable(RentGameFormViewModel model, string gameId)
        {
            var game = await dbContext.Games.FirstAsync(g => g.Id.ToString() == gameId);

            // Check availability for each date in the rental period
            var rentalDates = Enumerable
                .Range(0, (model.EndDate - model.StartDate).Days + 1) // Loop through each day in the requested rental period
                .Select(offset => model.StartDate.AddDays(offset))
                .ToList();

            foreach (var date in rentalDates)
            {
                // Calculate total reserved quantity for the same game on this date
                var reservedQuantity = await dbContext.Rentals
                    .Where(r => r.GameId.ToString() == gameId &&
                        r.RentalDate.Date <= date.Date && // Rental started on or before the current date
                        (
                            r.ActualReturnDate == null || // Not yet returned
                            (
                                r.ActualReturnDate.Value.Date > date.Date || // Returned after the current date
                                (r.ActualReturnDate.Value.Date == date.Date && r.ActualReturnDate.Value.TimeOfDay > model.StartTime) // Returned on the same date but after the requested time
                            )
                        ) &&
                        (
                            // Start of requested range overlaps
                            (model.StartTime >= r.RentalDate.TimeOfDay && model.StartTime < r.ExpectedReturnDate.TimeOfDay) ||
                            // End of requested range overlaps
                            (model.EndTime > r.RentalDate.TimeOfDay && model.EndTime <= r.ExpectedReturnDate.TimeOfDay) ||
                            // Requested range fully encompasses existing range
                            (model.StartTime <= r.RentalDate.TimeOfDay && model.EndTime >= r.ExpectedReturnDate.TimeOfDay)
                        )
                    )
                    .CountAsync();

                // Calculate available quantity for this date
                var availableQuantity = game.TotalQuantity - reservedQuantity;

                // Check if there are enough available games
                if (availableQuantity < model.Quantity)
                {
                    return false; // Not enough copies available for this date
                }
            }

            return true; 
        }


        public async Task RentGame(RentGameFormViewModel model, string userId, string gameId)
        {
            var rental = new Rental
            {
                UserId = Guid.Parse(userId),
                GameId = Guid.Parse(gameId),
                RentalDate = model.StartDate.Add(model.StartTime), // Combine RequestedRentDate and StartTime
                ExpectedReturnDate = model.EndDate.Add(model.EndTime),
                ActualReturnDate = null
            };

            // Add the rental to the database
            await dbContext.Rentals.AddAsync(rental);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<GameListViewModel>> SearchGamesByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Search term cannot be empty.", nameof(name));
            }

            var games = await dbContext.Games
                .Where(g => (g.Title != null && EF.Functions.Like(g.Title.ToLower(), $"%{name.ToLower()}%")))
                .ToListAsync();

            return games.Select(g => new GameListViewModel
            {
                Id = g.Id.ToString(),
                Title = g.Title,
                ImageUrl = g.ImageUrl
            });
        }

        public async Task<IEnumerable<GameListViewModel>> GetLikedGamesByUserID(string userId)
        {
            IEnumerable<GameListViewModel> games = await dbContext.LikedGames.Where(lk => lk.UserId.ToString() == userId)
                .Select(lk => new GameListViewModel
                { 
                    Id= lk.Game.Id.ToString(),
                    Title= lk.Game.Title,
                    ImageUrl= lk.Game.ImageUrl
                }).ToListAsync();       

            return games;
        }

        public async Task<IEnumerable<RentedGameListViewModel>> GetActiveRentedGamesByUserId(string userId)
        {
            IEnumerable<RentedGameListViewModel> rentedGames = await dbContext.Rentals
                .Where(rg => rg.UserId.ToString() == userId &&
                rg.ActualReturnDate == null && rg.ExpectedReturnDate < DateTime.UtcNow)
                .Select(rg => new RentedGameListViewModel
                {
                    Id = rg.Game.Id.ToString(),
                    Title = rg.Game.Title,
                    ImageUrl = rg.Game.ImageUrl,
                    StartDate = rg.RentalDate,
                    EndDate = rg.ExpectedReturnDate
                }).ToListAsync();

            return rentedGames;
        }

        public async Task<IEnumerable<RentedGameListViewModel>> GetOverdueGamesByUserId(string userId)
        {
            IEnumerable<RentedGameListViewModel> rentedGames = await dbContext.Rentals
                .Where(rg => rg.UserId.ToString() == userId &&
                rg.ActualReturnDate == null && rg.ExpectedReturnDate >= DateTime.UtcNow)
                .Select(rg => new RentedGameListViewModel
                {
                    Id = rg.Game.Id.ToString(),
                    Title = rg.Game.Title,
                    ImageUrl = rg.Game.ImageUrl,
                    StartDate = rg.RentalDate,
                    EndDate = rg.ExpectedReturnDate
                }).ToListAsync();

            return rentedGames;
        }
        public async Task<bool> IsGameAlreadyLikedByUserAsync(string gameId, string userId)
        {
            bool result = await dbContext.LikedGames.AnyAsync(lg => lg.GameId.ToString() == gameId && lg.UserId.ToString() == userId);
            return result;
        }
        public async Task LikeGameAsync(string gameId, string userId)
        {
            LikedGame likedGame = new()
            {
                UserId = Guid.Parse(userId),
                GameId = Guid.Parse(gameId)
            };

            await dbContext.LikedGames.AddAsync(likedGame);
            await dbContext.SaveChangesAsync();
        }
        public async Task<bool> IsGameAlreadyRatedByUserAsync(string gameId, string userId)
        {
            bool result = await dbContext.Ratings.AnyAsync(r => r.UserId.ToString() == userId && r.GameId.ToString() == gameId);
            return result;
        }
        public async Task RateGame(GameRatingFormViewModel model, string gameId, string userId)
        {
            Rating rating = new()
            {
                GameId = Guid.Parse(gameId),
                UserId = Guid.Parse(userId),
                Score = model.Score,
                Comment = model.Comment,
                RatingDate = DateTime.UtcNow
            };

            await dbContext.Ratings.AddAsync(rating);
            await dbContext.SaveChangesAsync();
        }
        public async Task<GameDetailsViewModel> GetGameDetailsAsync(string gameId, string userId)
        {
            AppUser user = await dbContext.Users.FirstAsync(u => u.Id.ToString() == userId);

            Game game = await dbContext.Games.FirstAsync(g => g.Id.ToString() == gameId);
            GameDetailsViewModel model = new();
            model.Title = game.Title;
            model.Description = game.Description;
            model.Difficulty = game.DifficultyLevel.ToString();
            model.Id = game.Id;
            model.Ratings = await dbContext.Ratings.Where(r => r.GameId.ToString() == gameId).Select(r => new RatingViewModel
            {
                Username = user.UserName,
                Score = r.Score,
                Comment = r.Comment,
                DateCreated = DateTime.UtcNow.ToShortDateString()
            }).ToListAsync();

            return model;
        }
    }
}
