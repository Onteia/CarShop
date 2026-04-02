using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class ImageResponseDTO {
        public Guid ImageID { get; set; }

        [DataType(DataType.ImageUrl)]
        public string ImageURI { get; set; }
    }
}
