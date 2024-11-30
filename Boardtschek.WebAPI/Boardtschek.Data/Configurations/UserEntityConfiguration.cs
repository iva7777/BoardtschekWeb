using Boardtschek.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardtschek.Data.Configurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.HasData(GenerateUsers());
        }

        private AppUser[] GenerateUsers()
        {
            ICollection<AppUser> users = new HashSet<AppUser>();

            AppUser user;

            user = new AppUser()
            {
                Id = Guid.Parse("30F0662A-29C5-48DF-8B57-9C61C671E0FB"),
                FirstName = "Admin",
                LastName = "Admin",
                ImageUrl = "https://cdn.pixabay.com/photo/2016/02/09/08/05/administrator-1188494_960_720.jpg",
                UserName = "admin@boardtschek.com",
                NormalizedUserName = "ADMIN@BOARDTSCHEK.COM",
                Email = "admin@boardtschek.com",
                NormalizedEmail = "ADMIN@BOARDTSCHEK.COM",
                PasswordHash = "AQAAAAEAACcQAAAAEP6HBNREH9Mkpk1HC/mZSdZ4K2+7X5A1FgfPtxgeuBkfuSp+GRhfwkc35x+TDUfOcg==",
                SecurityStamp = "a5d43b6b-18d4-4c6d-96f4-15891acf56cd",
                ConcurrencyStamp = "7f61ebd4-3074-4302-a364-d2320260a045"
            };

            users.Add(user);

            return users.ToArray();
        }
    }
}
