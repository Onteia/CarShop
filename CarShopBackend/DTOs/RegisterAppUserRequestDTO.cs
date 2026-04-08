using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class RegisterAppUserRequestDTO {
        [Required]
        [MaxLength(64)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8), MaxLength(128)]
        public string Password { get; set; }
    }
}
