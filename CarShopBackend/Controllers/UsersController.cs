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
        public async Task<ActionResult<AppUserResponseDTO>> CreateUser(RegisterAppUserRequestDTO registeruser) {
            if(registeruser == null) return BadRequest();

            AppUser user = new AppUser {
                UserName = registeruser.Username,
                Email = registeruser.Email,
                Cart = new CartModel(),
                Wishlist = new WishlistModel(),
            };

            var result = await _userManager.CreateAsync(user, registeruser.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);

            return new AppUserResponseDTO {
                UserID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                CartID = user.Cart.CartID,
                WishlistID = user.Wishlist.WishlistID,
            };
        }

        // Read: /users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUserResponseDTO>> ReadUser(string id) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            return new AppUserResponseDTO {
                UserID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                CartID = user.Cart.CartID,
                WishlistID = user.Wishlist.WishlistID,
            };
        }

        // Update: /users/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<AppUserResponseDTO>> UpdateUser(string id, AppUserResponseDTO updatedUser) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            if(updatedUser.Username != user.UserName) {
                var result = await _userManager.SetUserNameAsync(user, updatedUser.Username);
                if(!result.Succeeded) return BadRequest(result.Errors);
            }

            if(updatedUser.Email != user.Email) {
                var result = await _userManager.SetEmailAsync(user, updatedUser.Email);
                if(!result.Succeeded) return BadRequest(result.Errors);
            }

            return new AppUserResponseDTO {
                UserID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                CartID = user.Cart.CartID,
                WishlistID = user.Wishlist.WishlistID,
            };
        }

        // Delete: /users/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id) {
            AppUser user = await _userManager.FindByIdAsync(id);

            if(user == null) return NotFound();

            var result = await _userManager.DeleteAsync(user);

            if(!result.Succeeded) return BadRequest(result.Errors);
            return Ok();
        }
    }
}
