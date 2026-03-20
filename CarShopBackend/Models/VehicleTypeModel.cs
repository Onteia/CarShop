using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class VehicleTypeModel {

    public VehicleTypeModel() {
        VehicleTypeID = Guid.NewGuid();
    }

    [Key]
    public Guid VehicleTypeID { get; private set; }

    [Required]
    public string TypeName { get; set; }
}
