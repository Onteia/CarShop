


namespace CarShopBackend.DTOs {
    public class AppUserResponseDTO {
        public string UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public Guid CartID { get; set; }
        public Guid WishlistID { get; set; }
    }
}
