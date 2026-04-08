using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using CarShopBackend.Data;
using CarShopBackend.DTOs;
using CarShopBackend.Models;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {

        private readonly AppDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;

        public UsersController(AppDbContext dbContext, UserManager<AppUser> userManager) {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        // Create: /users
        [HttpPost]
        public async Task<ActionResult<AppUserResponseDTO>> CreateUser([FromBody] RegisterAppUserRequestDTO registeruser) {
            if(registeruser == null) return BadRequest();

            AppUser user = new AppUser {
                UserName = registeruser.Username,
                Email = registeruser.Email,
                Cart = new CartModel(),
                Wishlist = new WishlistModel(),
            };

            var result = await _userManager.CreateAsync(user, registeruser.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("CreateUser", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadUser", null, new { user.Id }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateUser", null, new { user.Id }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteUser", null, new { user.Id }, scheme, host), Method = "DELETE" });

            return new AppUserResponseDTO {
                UserID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                CartID = user.Cart.CartID,
                WishlistID = user.Wishlist.WishlistID,
                Links = links,
            };
        }

        // Read: /users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUserResponseDTO>> ReadUser(string id) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadUser", null, new { user.Id }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateUser", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "update", Href = Url.Action("UpdateUser", null, new { user.Id }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteUser", null, new { user.Id }, scheme, host), Method = "DELETE" });

            return new AppUserResponseDTO {
                UserID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                CartID = user.CartID,
                WishlistID = user.WishlistID,
                Links = links,
            };
        }

        // Read: /users/{id}/carts
        [HttpGet("{id}/carts")]
        public async Task<ActionResult> ReadUserCart(string id) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new();
            links.Add(new Link { Rel = "self", Href = Url.Action("ReadUserCart", null, new { user.Id }, scheme, host), Method = "GET" });
            links.Add(new Link { Rel = "read-cart-listings", Href = Url.Action("ReadCartListings", "Carts", new { id = user.CartID }, scheme, host), Method = "GET" });

            return Ok(new { CartID = user.CartID, Links = links });
        }

        // Update: /users/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<AppUserResponseDTO>> UpdateUser([FromRoute] string id, [FromBody] AppUserResponseDTO updatedUser) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            if(updatedUser.Username != user.UserName && updatedUser.Username != "") {
                var result = await _userManager.SetUserNameAsync(user, updatedUser.Username);
                if(!result.Succeeded) return BadRequest(result.Errors);
            }

            if(updatedUser.Email != user.Email && updatedUser.Email != "") {
                var result = await _userManager.SetEmailAsync(user, updatedUser.Email);
                if(!result.Succeeded) return BadRequest(result.Errors);
            }

            string scheme = Url.ActionContext.HttpContext.Request.Scheme;
            string host = Url.ActionContext.HttpContext.Request.Host.ToString();

            List<Link> links = new List<Link>();
            links.Add(new Link { Rel = "self", Href = Url.Action("UpdateUser", null, new { user.Id }, scheme, host), Method = "PUT" });
            links.Add(new Link { Rel = "create", Href = Url.Action("CreateUser", null, null, scheme, host), Method = "POST" });
            links.Add(new Link { Rel = "read", Href = Url.Action("ReadUser", new { user.Id }), Method = "GET" });
            links.Add(new Link { Rel = "delete", Href = Url.Action("DeleteUser", new { user.Id }), Method = "DELETE" });

            return new AppUserResponseDTO {
                UserID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                CartID = user.Cart.CartID,
                WishlistID = user.Wishlist.WishlistID,
                Links = links,
            };
        }

        // Delete: /users/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            var result = await _userManager.DeleteAsync(user);

            if(!result.Succeeded) return BadRequest(result.Errors);

            return Ok("Resource deleted");
        }
    }
}
