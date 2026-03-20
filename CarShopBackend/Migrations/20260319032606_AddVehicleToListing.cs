using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddVehicleToListing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "VehicleID",
                table: "Listings",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Listings_VehicleID",
                table: "Listings",
                column: "VehicleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Vehicles_VehicleID",
                table: "Listings",
                column: "VehicleID",
                principalTable: "Vehicles",
                principalColumn: "VehicleID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Vehicles_VehicleID",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_VehicleID",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "VehicleID",
                table: "Listings");
        }
    }
}
