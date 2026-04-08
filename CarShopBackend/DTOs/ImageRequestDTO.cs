using System.ComponentModel.DataAnnotations;

namespace CarShopBackend.DTOs {
    public class ImageRequestDTO {
        [Required]
        [DataType(DataType.ImageUrl)]
        public string ImageURI { get; set; }
    }
}
