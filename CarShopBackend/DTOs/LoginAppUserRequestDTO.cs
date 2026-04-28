using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs
{
    public class LoginAppUserRequestDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
