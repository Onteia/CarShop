using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class VehicleTypeRequestDTO {
        [Required]
        public string TypeName { get; set; }
    }
}
