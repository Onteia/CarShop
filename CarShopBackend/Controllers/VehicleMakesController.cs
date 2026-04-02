using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.Models;
using CarShopBackend.DTOs;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class VehicleMakesController : ControllerBase {
        private readonly AppDbContext _dbContext;

        public VehicleMakesController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // Create: /vehiclemakes
        [HttpPost]
        public async Task<ActionResult<VehicleMakeResponseDTO>> CreateVehicleMake([FromBody] VehicleMakeRequestDTO vehicleMake) {
            var existingMake = _dbContext.VehicleMakes.FirstOrDefault(m => m.MakeName == vehicleMake.MakeName);

            if(existingMake != null) return BadRequest("Vehicle Make already exists");

            VehicleMakeModel make = new VehicleMakeModel {
                MakeName = vehicleMake.MakeName,
            };

            await _dbContext.VehicleMakes.AddAsync(make);
            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("CreateVehicleMake", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "DELETE" });

            return new VehicleMakeResponseDTO {
                VehicleMakeID = make.VehicleMakeID,
                MakeName = make.MakeName,
                Links = links,
            };
        }

        // Read: /vehicleMakes
        [HttpGet]
        public async Task<ActionResult> ReadAllMakes() {
            var makes = _dbContext.VehicleMakes.ToList();
            return Ok(new { Makes = makes });
        }

        // Read: /vehiclemakes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleMakeResponseDTO>> ReadVehicleMake([FromRoute] Guid id) {
            var make = await _dbContext.VehicleMakes.FindAsync(id);

            if(make == null) return NotFound();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateVehicleMake", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "DELETE" });

            return new VehicleMakeResponseDTO {
                VehicleMakeID = make.VehicleMakeID,
                MakeName = make.MakeName,
                Links = links,
            };
        }

        // Update: /vehiclemakes/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<VehicleMakeResponseDTO>> UpdateVehicleMake([FromRoute] Guid id, [FromBody] VehicleMakeRequestDTO vehicleMake) {
            var make = await _dbContext.VehicleMakes.FindAsync(id);

            if(make == null) return NotFound();
            if(make.MakeName == vehicleMake.MakeName) return BadRequest();

            make.MakeName = vehicleMake.MakeName;
            await _dbContext.SaveChangesAsync();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("UpdateVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateVehicleMake", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteVehicleMake", null, new { id = make.VehicleMakeID }, scheme, host), Method = "DELETE" });

            return new VehicleMakeResponseDTO {
                VehicleMakeID = make.VehicleMakeID,
                MakeName = make.MakeName,
                Links = links,
            };
        }

        // Delete: /vehiclemakes/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicleMake([FromRoute] Guid id) {
            var make = await _dbContext.VehicleMakes.FindAsync(id);

            if(make == null) return NotFound();

            _dbContext.Remove(make);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

    }
}
