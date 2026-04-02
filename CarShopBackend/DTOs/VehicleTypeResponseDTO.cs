using CarShopBackend.Data;

namespace CarShopBackend.DTOs {
    public class VehicleTypeResponseDTO {
        public Guid VehicleTypeID { get; set; }
        public string TypeName { get; set; }

        public List<Link> Links { get; set; }
    }
}
