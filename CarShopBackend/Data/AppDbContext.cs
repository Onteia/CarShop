using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CarShopBackend.Models;

namespace CarShopBackend.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<CartModel> Carts { get; set; }
        public DbSet<WishlistModel> Wishlists { get; set; }
        public DbSet<VehicleModel> Vehicles { get; set; }
        public DbSet<VehicleTypeModel> VehicleTypes { get; set; }
        public DbSet<VehicleMakeModel> VehicleMakes { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<ListingModel> Listings { get; set; }
        public DbSet<ListingToCartModel> ListingsToCarts { get; set; }
        public DbSet<ListingToWishlistModel> ListingsToWishlists { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
