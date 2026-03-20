using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class VehicleMakeModel {

    public VehicleMakeModel() {
        VehicleMakeID = Guid.NewGuid();
    }

    [Key]
    public Guid VehicleMakeID { get; private set; }

    [Required]
    public string MakeName { get; set; }
}
