using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CartModel",
                columns: table => new
                {
                    CartID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartModel", x => x.CartID);
                });

            migrationBuilder.CreateTable(
                name: "WishlistModel",
                columns: table => new
                {
                    WishlistID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishlistModel", x => x.WishlistID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    CartID = table.Column<Guid>(type: "uuid", nullable: true),
                    WishlistID = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_CartModel_CartID",
                        column: x => x.CartID,
                        principalTable: "CartModel",
                        principalColumn: "CartID");
                    table.ForeignKey(
                        name: "FK_Users_WishlistModel_WishlistID",
                        column: x => x.WishlistID,
                        principalTable: "WishlistModel",
                        principalColumn: "WishlistID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CartID",
                table: "Users",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_WishlistID",
                table: "Users",
                column: "WishlistID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "CartModel");

            migrationBuilder.DropTable(
                name: "WishlistModel");
        }
    }
}
