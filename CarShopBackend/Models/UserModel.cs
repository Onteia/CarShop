using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class UserModel {

    public UserModel() {
        UserID = Guid.NewGuid();
    }

    [Key]
    public Guid UserID { get; private set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    public virtual CartModel Cart { get; set; }
    public virtual WishlistModel Wishlist { get; set; }
}
