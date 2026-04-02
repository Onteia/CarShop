using CarShopBackend.Data;

namespace CarShopBackend.DTOs {
    public class VehicleMakeResponseDTO {
        public Guid VehicleMakeID { get; set; }
        public string MakeName { get; set; }

        public List<Link> Links { get; set; }
    }
}
