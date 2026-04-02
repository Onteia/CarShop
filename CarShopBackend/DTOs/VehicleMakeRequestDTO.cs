using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class VehicleMakeRequestDTO {
        [Required]
        public string MakeName { get; set; }
    }
}
