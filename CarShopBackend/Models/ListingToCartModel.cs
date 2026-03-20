using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class ListingToCartModel {

    public ListingToCartModel() {
        ListingToCartID = Guid.NewGuid();
    }

    [Key]
    public Guid ListingToCartID { get; private set; }

    [Required]
    public virtual ListingModel Listing { get; set; }

    [Required]
    public virtual CartModel Cart { get; set; }
}
