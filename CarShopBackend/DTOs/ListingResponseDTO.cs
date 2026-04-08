using CarShopBackend.Data;
using CarShopBackend.Models;

namespace CarShopBackend.DTOs {
    public class ListingResponseDTO {
        public Guid ListingID { get; set; }
        public string Name { get; set; }
        public decimal ListPrice { get; set; }
        public int? SaleAmount { get; set; }
        public VehicleModel Vehicle { get; set; }

        public List<Link> Links { get; set; }
    }
}
