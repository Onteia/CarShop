using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.DTOs;
using CarShopBackend.Models;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase {
        private readonly AppDbContext _dbContext;

        public VehiclesController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // Create: /vehicles
        [HttpPost]
        public async Task<ActionResult<VehicleResponseDTO>> CreateVehicle([FromBody] VehicleRequestDTO vehicle) {
            var existingType = await _dbContext.VehicleTypes.FindAsync(vehicle.VehicleTypeID);
            if(existingType == null) return NotFound("VehicleTypeID doesn't exist");

            var existingMake = await _dbContext.VehicleMakes.FindAsync(vehicle.VehicleMakeID);
            if(existingMake == null) return NotFound("VehicleMakeID doesn't exist");

            var missingImage = vehicle.ImageIDs.Any(imageID => _dbContext.Images.Find(imageID) == null);
            if(missingImage == true) return NotFound("An ImageID provided doesn't exist");

            var images = vehicle.ImageIDs.Select(imageID => _dbContext.Images.Find(imageID)).ToList();

            var vehicleModel = new VehicleModel {
                Model = vehicle.Model,
                Year = vehicle.Year,
                IsUsed = vehicle.IsUsed,
                VehicleType = existingType,
                VehicleMake = existingMake,
                Images = images,
            };

            await _dbContext.Vehicles.AddAsync(vehicleModel);
            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("CreateVehicle", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadVehicle", null, new { id = vehicleModel.VehicleID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicle", null, new { id = vehicleModel.VehicleID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicle", null, new { id = vehicleModel.VehicleID }, scheme, host), Method = "DELETE" });

            return new VehicleResponseDTO {
                VehicleID = vehicleModel.VehicleID,
                Model = vehicleModel.Model,
                Year = vehicleModel.Year,
                IsUsed = vehicleModel.IsUsed,
                VehicleTypeID = vehicleModel.VehicleType.VehicleTypeID,
                VehicleMakeID = vehicleModel.VehicleMake.VehicleMakeID,
                ImageIDs = vehicleModel.Images.Select(image => image.ImageID).ToList(),
                Links = links,
            };
        }

        // Read: /vehicles/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleResponseDTO>> ReadVehicle([FromRoute] Guid id) {
            var vehicle = await _dbContext.Vehicles.FindAsync(id);

            if(vehicle == null) return NotFound();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadVehicle", null, new { id = vehicle.VehicleID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateVehicle", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicle", null, new { id = vehicle.VehicleID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicle", null, new { id = vehicle.VehicleID }, scheme, host), Method = "DELETE" });

            return new VehicleResponseDTO {
                VehicleID = vehicle.VehicleID,
                Model = vehicle.Model,
                Year = vehicle.Year,
                IsUsed = vehicle.IsUsed,
                VehicleTypeID = vehicle.VehicleType.VehicleTypeID,
                VehicleMakeID = vehicle.VehicleMake.VehicleMakeID,
                ImageIDs = vehicle.Images.Select(image => image.ImageID).ToList(),
                Links = links,
            };
        }

        // Update: /vehicles/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<VehicleResponseDTO>> UpdateVehicle([FromRoute] Guid id, [FromBody] VehicleRequestDTO vehicleRequest) {
            var vehicle = await _dbContext.Vehicles.FindAsync(id);

            if(vehicle == null) return NotFound();

            vehicle.Model = vehicleRequest.Model;
            vehicle.Year = vehicleRequest.Year;
            vehicle.IsUsed = vehicleRequest.IsUsed;
            vehicle.VehicleType = await _dbContext.VehicleTypes.FindAsync(vehicleRequest.VehicleTypeID);
            vehicle.VehicleMake = await _dbContext.VehicleMakes.FindAsync(vehicleRequest.VehicleMakeID);
            vehicle.Images = vehicleRequest.ImageIDs.Select(imageID => _dbContext.Images.Find(imageID)).ToList();

            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadVehicle", null, new { id = vehicle.VehicleID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateVehicle", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicle", null, new { id = vehicle.VehicleID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicle", null, new { id = vehicle.VehicleID }, scheme, host), Method = "DELETE" });

            return new VehicleResponseDTO {
                VehicleID = vehicle.VehicleID,
                Model = vehicle.Model,
                Year = vehicle.Year,
                IsUsed = vehicle.IsUsed,
                VehicleTypeID = vehicle.VehicleType.VehicleTypeID,
                VehicleMakeID = vehicle.VehicleMake.VehicleMakeID,
                ImageIDs = vehicle.Images.Select(image => image.ImageID).ToList(),
                Links = links,
            };
        }

        // Delete: /vehicles/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicle([FromRoute] Guid id) {
            var vehicle = await _dbContext.Vehicles.FindAsync(id);

            if(vehicle == null) return NotFound();

            _dbContext.Images.RemoveRange(vehicle.Images);
            _dbContext.Vehicles.Remove(vehicle);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
