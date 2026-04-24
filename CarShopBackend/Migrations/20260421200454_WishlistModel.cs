using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class WishlistModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Listings_ListingModelListingID",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Vehicles_VehicleID",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_ListingToWishlist_Listings_ListingID",
                table: "ListingToWishlist");

            migrationBuilder.DropForeignKey(
                name: "FK_ListingToWishlist_Wishlists_WishlistID",
                table: "ListingToWishlist");

            migrationBuilder.DropIndex(
                name: "IX_Images_ListingModelListingID",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ListingToWishlist",
                table: "ListingToWishlist");

            migrationBuilder.DropColumn(
                name: "ListingModelListingID",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "ListingToWishlist",
                newName: "ListingsToWishlists");

            migrationBuilder.RenameIndex(
                name: "IX_ListingToWishlist_WishlistID",
                table: "ListingsToWishlists",
                newName: "IX_ListingsToWishlists_WishlistID");

            migrationBuilder.RenameIndex(
                name: "IX_ListingToWishlist_ListingID",
                table: "ListingsToWishlists",
                newName: "IX_ListingsToWishlists_ListingID");

            migrationBuilder.AlterColumn<Guid>(
                name: "VehicleID",
                table: "Listings",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ListingsToWishlists",
                table: "ListingsToWishlists",
                column: "ListingToWishlistID");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Vehicles_VehicleID",
                table: "Listings",
                column: "VehicleID",
                principalTable: "Vehicles",
                principalColumn: "VehicleID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ListingsToWishlists_Listings_ListingID",
                table: "ListingsToWishlists",
                column: "ListingID",
                principalTable: "Listings",
                principalColumn: "ListingID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ListingsToWishlists_Wishlists_WishlistID",
                table: "ListingsToWishlists",
                column: "WishlistID",
                principalTable: "Wishlists",
                principalColumn: "WishlistID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Vehicles_VehicleID",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_ListingsToWishlists_Listings_ListingID",
                table: "ListingsToWishlists");

            migrationBuilder.DropForeignKey(
                name: "FK_ListingsToWishlists_Wishlists_WishlistID",
                table: "ListingsToWishlists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ListingsToWishlists",
                table: "ListingsToWishlists");

            migrationBuilder.RenameTable(
                name: "ListingsToWishlists",
                newName: "ListingToWishlist");

            migrationBuilder.RenameIndex(
                name: "IX_ListingsToWishlists_WishlistID",
                table: "ListingToWishlist",
                newName: "IX_ListingToWishlist_WishlistID");

            migrationBuilder.RenameIndex(
                name: "IX_ListingsToWishlists_ListingID",
                table: "ListingToWishlist",
                newName: "IX_ListingToWishlist_ListingID");

            migrationBuilder.AlterColumn<Guid>(
                name: "VehicleID",
                table: "Listings",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "ListingModelListingID",
                table: "Images",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ListingToWishlist",
                table: "ListingToWishlist",
                column: "ListingToWishlistID");

            migrationBuilder.CreateIndex(
                name: "IX_Images_ListingModelListingID",
                table: "Images",
                column: "ListingModelListingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Listings_ListingModelListingID",
                table: "Images",
                column: "ListingModelListingID",
                principalTable: "Listings",
                principalColumn: "ListingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Vehicles_VehicleID",
                table: "Listings",
                column: "VehicleID",
                principalTable: "Vehicles",
                principalColumn: "VehicleID");

            migrationBuilder.AddForeignKey(
                name: "FK_ListingToWishlist_Listings_ListingID",
                table: "ListingToWishlist",
                column: "ListingID",
                principalTable: "Listings",
                principalColumn: "ListingID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ListingToWishlist_Wishlists_WishlistID",
                table: "ListingToWishlist",
                column: "WishlistID",
                principalTable: "Wishlists",
                principalColumn: "WishlistID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
