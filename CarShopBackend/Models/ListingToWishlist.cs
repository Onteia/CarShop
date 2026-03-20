using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class ListingToWishlist {

    public ListingToWishlist() {
        ListingToWishlistID = Guid.NewGuid();
    }

    [Key]
    public Guid ListingToWishlistID { get; private set; }

    [Required]
    public virtual ListingModel Listing { get; set; }

    [Required]
    public virtual WishlistModel Wishlist { get; set; }
}
