using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using CarShopBackend.Models;

namespace CarShopBackend.Data {
    public class AppUser : IdentityUser {
        public Guid CartID { get; set; }
        [ForeignKey(nameof(CartID))]
        public virtual CartModel Cart { get; set; }

        public Guid WishlistID { get; set; }
        [ForeignKey(nameof(WishlistID))]
        public virtual WishlistModel Wishlist { get; set; }
    }
}
