using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Models;
using CarShopBackend.Data;
using CarShopBackend.DTOs;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase {
        private readonly AppDbContext _dbContext;

        public ImagesController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // Create: /images
        [HttpPost]
        public async Task<ActionResult<ImageResponseDTO>> CreateImage([FromBody] ImageRequestDTO image) {
            if(!Uri.IsWellFormedUriString(image.ImageURI, UriKind.RelativeOrAbsolute)) return BadRequest();

            var newImage = new ImageModel {
                ImageURI = image.ImageURI,
            };
            await _dbContext.AddAsync(newImage);
            await _dbContext.SaveChangesAsync();

            return new ImageResponseDTO {
                ImageID = newImage.ImageID,
                ImageURI = newImage.ImageURI,
            };
        }

        // Read: /images/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ImageResponseDTO>> ReadImage([FromRoute] Guid id) {
            var image = await _dbContext.Images.FindAsync(id);

            if(image == null) return NotFound();

            return new ImageResponseDTO {
                ImageID = image.ImageID,
                ImageURI = image.ImageURI,
            };
        }

        // Delete: /images/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteImage([FromRoute] Guid id) {
            var image = await _dbContext.Images.FindAsync(id);

            if(image == null) return NotFound();

            _dbContext.Remove(image);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
