using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddAllModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_CartModel_CartID",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_WishlistModel_WishlistID",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WishlistModel",
                table: "WishlistModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CartModel",
                table: "CartModel");

            migrationBuilder.RenameTable(
                name: "WishlistModel",
                newName: "Wishlists");

            migrationBuilder.RenameTable(
                name: "CartModel",
                newName: "Carts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Wishlists",
                table: "Wishlists",
                column: "WishlistID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Carts",
                table: "Carts",
                column: "CartID");

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    ListingID = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ListPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    SaleAmount = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.ListingID);
                });

            migrationBuilder.CreateTable(
                name: "VehicleMakes",
                columns: table => new
                {
                    VehicleMakeID = table.Column<Guid>(type: "uuid", nullable: false),
                    MakeName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleMakes", x => x.VehicleMakeID);
                });

            migrationBuilder.CreateTable(
                name: "VehicleTypes",
                columns: table => new
                {
                    VehicleTypeID = table.Column<Guid>(type: "uuid", nullable: false),
                    TypeName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleTypes", x => x.VehicleTypeID);
                });

            migrationBuilder.CreateTable(
                name: "ListingsToCarts",
                columns: table => new
                {
                    ListingToCartID = table.Column<Guid>(type: "uuid", nullable: false),
                    ListingID = table.Column<Guid>(type: "uuid", nullable: false),
                    CartID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingsToCarts", x => x.ListingToCartID);
                    table.ForeignKey(
                        name: "FK_ListingsToCarts_Carts_CartID",
                        column: x => x.CartID,
                        principalTable: "Carts",
                        principalColumn: "CartID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListingsToCarts_Listings_ListingID",
                        column: x => x.ListingID,
                        principalTable: "Listings",
                        principalColumn: "ListingID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListingToWishlist",
                columns: table => new
                {
                    ListingToWishlistID = table.Column<Guid>(type: "uuid", nullable: false),
                    ListingID = table.Column<Guid>(type: "uuid", nullable: false),
                    WishlistID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingToWishlist", x => x.ListingToWishlistID);
                    table.ForeignKey(
                        name: "FK_ListingToWishlist_Listings_ListingID",
                        column: x => x.ListingID,
                        principalTable: "Listings",
                        principalColumn: "ListingID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListingToWishlist_Wishlists_WishlistID",
                        column: x => x.WishlistID,
                        principalTable: "Wishlists",
                        principalColumn: "WishlistID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    VehicleID = table.Column<Guid>(type: "uuid", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<string>(type: "text", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    VehicleTypeID = table.Column<Guid>(type: "uuid", nullable: false),
                    VehicleMakeID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.VehicleID);
                    table.ForeignKey(
                        name: "FK_Vehicles_VehicleMakes_VehicleMakeID",
                        column: x => x.VehicleMakeID,
                        principalTable: "VehicleMakes",
                        principalColumn: "VehicleMakeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vehicles_VehicleTypes_VehicleTypeID",
                        column: x => x.VehicleTypeID,
                        principalTable: "VehicleTypes",
                        principalColumn: "VehicleTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    ImageID = table.Column<Guid>(type: "uuid", nullable: false),
                    ImageURI = table.Column<string>(type: "text", nullable: false),
                    ListingModelListingID = table.Column<Guid>(type: "uuid", nullable: true),
                    VehicleModelVehicleID = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.ImageID);
                    table.ForeignKey(
                        name: "FK_Images_Listings_ListingModelListingID",
                        column: x => x.ListingModelListingID,
                        principalTable: "Listings",
                        principalColumn: "ListingID");
                    table.ForeignKey(
                        name: "FK_Images_Vehicles_VehicleModelVehicleID",
                        column: x => x.VehicleModelVehicleID,
                        principalTable: "Vehicles",
                        principalColumn: "VehicleID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_ListingModelListingID",
                table: "Images",
                column: "ListingModelListingID");

            migrationBuilder.CreateIndex(
                name: "IX_Images_VehicleModelVehicleID",
                table: "Images",
                column: "VehicleModelVehicleID");

            migrationBuilder.CreateIndex(
                name: "IX_ListingsToCarts_CartID",
                table: "ListingsToCarts",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_ListingsToCarts_ListingID",
                table: "ListingsToCarts",
                column: "ListingID");

            migrationBuilder.CreateIndex(
                name: "IX_ListingToWishlist_ListingID",
                table: "ListingToWishlist",
                column: "ListingID");

            migrationBuilder.CreateIndex(
                name: "IX_ListingToWishlist_WishlistID",
                table: "ListingToWishlist",
                column: "WishlistID");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_VehicleMakeID",
                table: "Vehicles",
                column: "VehicleMakeID");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_VehicleTypeID",
                table: "Vehicles",
                column: "VehicleTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Carts_CartID",
                table: "Users",
                column: "CartID",
                principalTable: "Carts",
                principalColumn: "CartID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Wishlists_WishlistID",
                table: "Users",
                column: "WishlistID",
                principalTable: "Wishlists",
                principalColumn: "WishlistID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Carts_CartID",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Wishlists_WishlistID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "ListingsToCarts");

            migrationBuilder.DropTable(
                name: "ListingToWishlist");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.DropTable(
                name: "VehicleMakes");

            migrationBuilder.DropTable(
                name: "VehicleTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Wishlists",
                table: "Wishlists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Carts",
                table: "Carts");

            migrationBuilder.RenameTable(
                name: "Wishlists",
                newName: "WishlistModel");

            migrationBuilder.RenameTable(
                name: "Carts",
                newName: "CartModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WishlistModel",
                table: "WishlistModel",
                column: "WishlistID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartModel",
                table: "CartModel",
                column: "CartID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_CartModel_CartID",
                table: "Users",
                column: "CartID",
                principalTable: "CartModel",
                principalColumn: "CartID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_WishlistModel_WishlistID",
                table: "Users",
                column: "WishlistID",
                principalTable: "WishlistModel",
                principalColumn: "WishlistID");
        }
    }
}
