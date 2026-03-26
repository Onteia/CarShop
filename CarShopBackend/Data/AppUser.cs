using Microsoft.AspNetCore.Identity;
using CarShopBackend.Models;

namespace CarShopBackend.Data {
    public class AppUser : IdentityUser {
        public virtual CartModel Cart { get; set; } = null;
        public virtual WishlistModel Wishlist { get; set ;} = null;
    }
}
