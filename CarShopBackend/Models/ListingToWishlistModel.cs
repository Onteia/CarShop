using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class ListingToWishlistModel
{

    public ListingToWishlistModel()
    {
        ListingToWishlistID = Guid.NewGuid();
    }

    [Key]
    public Guid ListingToWishlistID { get; private set; }

    [Required]
    public virtual ListingModel Listing { get; set; }

    [Required]
    public virtual WishlistModel Wishlist { get; set; }
}
