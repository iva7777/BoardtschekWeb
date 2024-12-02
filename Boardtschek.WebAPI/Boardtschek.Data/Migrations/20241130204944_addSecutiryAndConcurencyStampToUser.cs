using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardtschek.Data.Migrations
{
    /// <inheritdoc />
    public partial class addSecutiryAndConcurencyStampToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("30f0662a-29c5-48df-8b57-9c61c671e0fb"),
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "7f61ebd4-3074-4302-a364-d2320260a045", "a5d43b6b-18d4-4c6d-96f4-15891acf56cd" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("30f0662a-29c5-48df-8b57-9c61c671e0fb"),
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "137ca235-28d4-41e4-ad0a-7ee9148c5094", null });
        }
    }
}
