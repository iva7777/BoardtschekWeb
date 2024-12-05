namespace Boardtschek.WebAPI.ViewModels.Game
{
    public class RentedGameListViewModel
    {
        public string Id { get; set; } = null!;

        public string Title { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
