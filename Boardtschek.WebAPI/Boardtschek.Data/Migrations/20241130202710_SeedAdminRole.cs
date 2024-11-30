using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardtschek.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdminRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("30f0662a-29c5-48df-8b57-9c61c671e0fb"),
                column: "ConcurrencyStamp",
                value: "137ca235-28d4-41e4-ad0a-7ee9148c5094");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("30f0662a-29c5-48df-8b57-9c61c671e0fb"),
                column: "ConcurrencyStamp",
                value: "ce67b3b4-580c-4a83-b4d1-62ffd7b5a586");
        }
    }
}
