using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class VehicleModel {

    public VehicleModel() {
        VehicleID = Guid.NewGuid();
    }

    [Key]
    public Guid VehicleID { get; private set; }

    [Required]
    public string Model { get; set; }

    [Required]
    [Range(1800, int.MaxValue)]
    public int Year { get; set; }

    [Required]
    public bool IsUsed { get; set; }

    [Required]
    public virtual VehicleTypeModel VehicleType { get; set; }

    [Required]
    public virtual VehicleMakeModel VehicleMake { get; set; }

    [Required]
    public virtual List<ImageModel> Images { get; set; } = new();


}
