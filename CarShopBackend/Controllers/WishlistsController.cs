using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.Models;

namespace CarShopBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WishlistsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public WishlistsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Read: /wishlists/{id}/listings
        [HttpGet("{id}/listings")]
        [ActionName("ReadWishlistListings")]
        public async Task<ActionResult> ReadWishlistListings([FromRoute] Guid id)
        {
            var wishlist = await _dbContext.Wishlists.FindAsync(id);
            if (wishlist == null) return NotFound();

            var listings = wishlist.ListingToWishlist.Select(ltw => ltw.Listing.ListingID);

            return Ok(new { listings = listings });
        }

        // Update: /wishlists/{id}/listings
        [HttpPost("{wishlistID}/listings")]
        [ActionName("AddListingToWishlist")]
        public async Task<ActionResult> AddListingToWishlist([FromRoute] Guid wishlistID, [FromBody] Guid listingID)
        {
            var wishlist = await _dbContext.Wishlists.FindAsync(wishlistID);
            var listing = await _dbContext.Listings.FindAsync(listingID);

            if (wishlist == null || listing == null) return NotFound();

            ListingToWishlistModel ltw = new ListingToWishlistModel
            {
                Wishlist = wishlist,
                Listing = listing,
            };

            wishlist.ListingToWishlist.Add(ltw);
            await _dbContext.ListingsToWishlists.AddAsync(ltw);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        // Delete: /wishlists/{id}/listings
        [HttpDelete("{wishlistID}/listings")]
        [ActionName("RemoveListingFromWishlist")]
        public async Task<ActionResult> RemoveListingFromWishlist([FromRoute] Guid wishlistID, [FromBody] Guid listingID)
        {
            var wishlist = await _dbContext.Wishlists.FindAsync(wishlistID);
            if (wishlist == null) return NotFound();

            var listing = wishlist.ListingToWishlist.FirstOrDefault(ltw => ltw.Listing.ListingID == listingID);
            if (listing == null) return NotFound();

            wishlist.ListingToWishlist.Remove(listing);
            await _dbContext.SaveChangesAsync();

            return Ok();

        }

    }
}
