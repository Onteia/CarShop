using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.Models;
using CarShopBackend.DTOs;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class VehicleTypesController : ControllerBase {
        private readonly AppDbContext _dbContext;

        public VehicleTypesController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // Create: /vehicletypes
        [HttpPost]
        public async Task<ActionResult<VehicleTypeResponseDTO>> CreateVehicleType([FromBody] VehicleTypeRequestDTO vehicleType) {
            var existingType = _dbContext.VehicleTypes.FirstOrDefault(m => m.TypeName == vehicleType.TypeName);

            if(existingType != null) return BadRequest("Vehicle Type already exists");

            VehicleTypeModel type = new VehicleTypeModel {
                TypeName = vehicleType.TypeName,
            };

            await _dbContext.VehicleTypes.AddAsync(type);
            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("CreateVehicleType", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "DELETE" });

            return new VehicleTypeResponseDTO {
                VehicleTypeID = type.VehicleTypeID,
                TypeName = type.TypeName,
                Links = links,
            };
        }

        // Read: /vehicletypes
        [HttpGet]
        public async Task<ActionResult> ReadAllTypes() {
            var types = _dbContext.VehicleTypes.ToList();

            return Ok(new { Types = types });
        }

        // Read: /vehicletypes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleTypeResponseDTO>> ReadVehicleType([FromRoute] Guid id) {
            var type = await _dbContext.VehicleTypes.FindAsync(id);

            if(type == null) return NotFound();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateVehicleType", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "DELETE" });

            return new VehicleTypeResponseDTO {
                VehicleTypeID = type.VehicleTypeID,
                TypeName = type.TypeName,
                Links = links,
            };
        }

        // Update: /vehicletypes/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<VehicleTypeResponseDTO>> UpdateVehicleType([FromRoute] Guid id, [FromBody] VehicleTypeRequestDTO vehicleType) {
            var type = await _dbContext.VehicleTypes.FindAsync(id);

            if(type == null) return NotFound();
            if(type.TypeName == vehicleType.TypeName) return BadRequest();

            type.TypeName = vehicleType.TypeName;
            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("UpdateVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateVehicleType", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicleType", null, new { id = type.VehicleTypeID }, scheme, host), Method = "DELETE" });

            return new VehicleTypeResponseDTO {
                VehicleTypeID = type.VehicleTypeID,
                TypeName = type.TypeName,
                Links = links,
            };
        }

        // Delete: /vehicletypes/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicleType([FromRoute] Guid id) {
            var type = await _dbContext.VehicleTypes.FindAsync(id);

            if(type == null) return NotFound();

            _dbContext.Remove(type);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
