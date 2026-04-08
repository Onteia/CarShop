using CarShopBackend.Data;

namespace CarShopBackend.DTOs {
    public class VehicleResponseDTO {
        public Guid VehicleID { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public bool IsUsed { get; set; }
        public Guid VehicleTypeID { get; set; }
        public Guid VehicleMakeID { get; set; }
        public List<Guid> ImageIDs { get; set; }

        public List<Link> Links { get; set; }
    }
}
