using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.Models;

namespace CarShopBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public CartsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Read: /carts/{id}/listings
        [HttpGet("{id}/listings")]
        [ActionName("ReadCartListings")]
        public async Task<ActionResult> ReadCartListings(Guid id)
        {
            var cart = await _dbContext.Carts.FindAsync(id);
            Console.WriteLine("reading for some reason");
            if (cart == null) return NotFound();

            var listings = cart.ListingToCart.Select(ltc => ltc.Listing.ListingID);

            return Ok(new { listings = listings });
        }

        // Update: /carts/{id}/listings
        [HttpPost("{cartID}/listings")]
        [ActionName("AddListingToCart")]
        public async Task<ActionResult> AddListingToCart([FromRoute] Guid cartID, [FromBody] Guid listingID)
        {
            var cart = await _dbContext.Carts.FindAsync(cartID);
            var listing = await _dbContext.Listings.FindAsync(listingID);

            if (cart == null || listing == null) return NotFound();

            _dbContext.ListingsToCarts.Add(new ListingToCartModel
            {
                Cart = cart,
                Listing = listing,
            });
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        // Delete: /carts/{id}/listings
        [HttpDelete("{cartID}/listings")]
        [ActionName("RemoveListingFromCart")]
        public async Task<ActionResult> RemoveListingFromCart([FromRoute] Guid cartID, [FromBody] Guid listingID)
        {
            var cart = await _dbContext.Carts.FindAsync(cartID);

            if (cart == null) return NotFound();

            var listing = cart.ListingToCart.FirstOrDefault(ltc => ltc.Listing.ListingID == listingID);
            if (listing == null) return NotFound();

            cart.ListingToCart.Remove(listing);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

    }
}
