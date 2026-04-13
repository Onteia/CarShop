using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.Models;
using CarShopBackend.DTOs;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase {
        private readonly AppDbContext _dbContext;

        public ListingsController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // Create: /listings
        [HttpPost]
        public async Task<ActionResult<ListingResponseDTO>> CreateListing([FromBody] ListingRequestDTO listingRequest) {
            var existingVehicle = await _dbContext.Vehicles.FindAsync(listingRequest.VehicleModelID);
            if(existingVehicle == null) return NotFound("VehicleModelID doesn't exist");

            var newListing = new ListingModel {
                Name = listingRequest.Name,
                ListPrice = listingRequest.ListPrice,
                SaleAmount = listingRequest.SaleAmount,
                Vehicle = existingVehicle,
            };

            await _dbContext.Listings.AddAsync(newListing);
            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("CreateListing", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadListing", null, new { id = newListing.ListingID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateListing", null, new { id = newListing.ListingID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteListing", null, new { id = newListing.ListingID }, scheme, host), Method = "DELETE" });

            return new ListingResponseDTO {
                ListingID = newListing.ListingID,
                Name = newListing.Name,
                ListPrice = newListing.ListPrice,
                SaleAmount = newListing.SaleAmount,
                Vehicle = newListing.Vehicle,
                Links = links,
            };
        }

        // Read: /listings/
        public async Task<ActionResult<List<ListingResponseDTO>>> ReadListings() {
            var listings = _dbContext.Listings.ToList();
            if(listings == null) return NotFound();

            return listings.Select(listing => new ListingResponseDTO {
                ListingID = listing.ListingID,
                Name = listing.Name,
                ListPrice = listing.ListPrice,
                SaleAmount = listing.SaleAmount,
                Vehicle = listing.Vehicle,
                Links = null,
            }).ToList();
        }

        // Read: /listings/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ListingResponseDTO>> ReadListing([FromRoute] Guid id) {
            var listing = await _dbContext.Listings.FindAsync(id);
            if(listing == null) return NotFound();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadListing", null, new { id = listing.ListingID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateListing", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateListing", null, new { id = listing.ListingID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteListing", null, new { id = listing.ListingID }, scheme, host), Method = "DELETE" });

            return new ListingResponseDTO {
                ListingID = listing.ListingID,
                Name = listing.Name,
                ListPrice = listing.ListPrice,
                SaleAmount = listing.SaleAmount,
                Vehicle = listing.Vehicle,
                Links = links,
            };
        }

        // Update: /listings/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<ListingResponseDTO>> UpdateListing([FromRoute] Guid id, [FromBody] ListingRequestDTO listingRequest) {
            var listing = await _dbContext.Listings.FindAsync(id);
            if(listing == null) return NotFound("Listing with given ID doesn't exist");

            var vehicle = await _dbContext.Vehicles.FindAsync(listingRequest.VehicleModelID);
            if(vehicle == null) return NotFound("Vehicle with given ID doesn't exist");

            listing.Name = listingRequest.Name;
            listing.ListPrice = listingRequest.ListPrice;
            listing.SaleAmount = listingRequest.SaleAmount;
            listing.Vehicle = vehicle;

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("UpdateListing", null, new { id = listing.ListingID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateListing", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadListing", null, new { id = listing.ListingID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteListing", null, new { id = listing.ListingID }, scheme, host), Method = "DELETE" });

            return new ListingResponseDTO {
                ListingID = listing.ListingID,
                Name = listing.Name,
                ListPrice = listing.ListPrice,
                SaleAmount = listing.SaleAmount,
                Vehicle = listing.Vehicle,
                Links = links,
            };
        }

        // Delete: /listings/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteListing([FromRoute] Guid id) {
            var listing = await _dbContext.Listings.FindAsync(id);
            if(listing == null) return NotFound("Listing with given ID doesn't exist");

            _dbContext.Vehicles.Remove(listing.Vehicle);
            _dbContext.ListingsToCarts.RemoveRange(listing.ListingToCart);
            _dbContext.ListingsToWishlists.RemoveRange(listing.ListingToWishlist);
            _dbContext.Listings.Remove(listing);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
