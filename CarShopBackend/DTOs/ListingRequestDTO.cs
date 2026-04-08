using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class ListingRequestDTO {
        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal ListPrice { get; set; }

        public int? SaleAmount { get; set; }

        [Required]
        public Guid VehicleModelID { get; set; }
    }
}
