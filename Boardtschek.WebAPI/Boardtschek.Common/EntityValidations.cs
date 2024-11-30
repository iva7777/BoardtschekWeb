namespace Boardtschek.Common
{
    public static class EntityValidations
    {
        public static class Game
        {
            public const int TitleMinLength = 2;
            public const int TitleMaxLength = 100;

            public const int MinPlayersMinValue = 1;
            public const int MinPlayersMaxValue = 8;

            public const int MaxPlayersMinValue = 2;
            public const int MaxPlayersMaxValue = 69;

            public const int DescriptionMaxLength = 1000;

            public const int ImageUrlMaxLength = 2048;

        }

        public static class Rating
        {
            public const int CommentMaxLength = 255;
        }

        public static class AppUser
        {
            public const int FirstNameMinLength = 2;
            public const int FirstNameMaxLength = 50;

            public const int LastNameMinLength = 2;
            public const int LastNameMaxLength = 100;

            public const int ImageUrlMaxLength = 2048;

        }

        public static class GeneralApplicationConstants
        {
            public const string AdminRoleName = "Administrator";
            public const string DevelopmentAdminEmail = "admin@boardtschek.com";

            public const string AdminAreaName = "Admin";
        }
    }
}
