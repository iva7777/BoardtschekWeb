using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardtschek.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedUserWithAdminCredentials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "ImageUrl", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("30f0662a-29c5-48df-8b57-9c61c671e0fb"), 0, "ce67b3b4-580c-4a83-b4d1-62ffd7b5a586", "admin@boardtschek.com", false, "Admin", "https://cdn.pixabay.com/photo/2016/02/09/08/05/administrator-1188494_960_720.jpg", "Admin", false, null, "ADMIN@BOARDTSCHEK.COM", "ADMIN@BOARDTSCHEK.COM", "AQAAAAEAACcQAAAAEP6HBNREH9Mkpk1HC/mZSdZ4K2+7X5A1FgfPtxgeuBkfuSp+GRhfwkc35x+TDUfOcg==", null, false, null, false, "admin@boardtschek.com" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("30f0662a-29c5-48df-8b57-9c61c671e0fb"));
        }
    }
}
