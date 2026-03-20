using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class CartModel {

    public CartModel() {
        CartID = Guid.NewGuid();
    }

    [Key]
    public Guid CartID { get; private set; }

    public virtual List<ListingToCartModel> ListingToCart { get; set; }
}

