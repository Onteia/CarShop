using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.Models;

public class ImageModel {

    public ImageModel() {
        ImageID = Guid.NewGuid();
    }

    [Key]
    public Guid ImageID { get; private set; }

    [Required]
    [DataType(DataType.ImageUrl)]
    public string ImageURI { get; set; }
}
