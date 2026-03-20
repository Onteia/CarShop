using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class ListingModel {

    public ListingModel() {
        ListingID = Guid.NewGuid();
    }

    [Key]
    public Guid ListingID { get; private set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [DataType(DataType.Currency)]
    public decimal ListPrice { get; set; }

    public int? SaleAmount { get; set; }

    public virtual VehicleModel Vehicle { get; set; }
    public virtual List<ImageModel> Images { get; set; }
    public virtual List<ListingToCartModel> ListingToCart { get; set; }
    public virtual List<ListingToWishlist> ListingToWishlist { get; set; }
}
