using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class VehicleRequestDTO {
        [Required]
        [MaxLength(64)]
        public string Model { get; set; }

        [Required]
        [Range(1800, int.MaxValue)]
        public int Year { get; set; }

        [Required]
        public bool IsUsed { get; set; }

        [Required]
        public Guid VehicleTypeID { get; set; }

        [Required]
        public Guid VehicleMakeID { get; set; }

        [Required]
        public List<Guid> ImageIDs { get; set; }
    }
}
