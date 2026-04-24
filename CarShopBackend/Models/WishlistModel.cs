using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class WishlistModel
{

    public WishlistModel()
    {
        WishlistID = Guid.NewGuid();
    }

    [Key]
    public Guid WishlistID { get; private set; }

    public virtual List<ListingToWishlistModel> ListingToWishlist { get; set; }
}
