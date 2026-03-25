using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;
using CarShopBackend.Models;

namespace CarShopBackend.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {

        private readonly AppDbContext _dbContext;

        public UsersController(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        // Create: /users
        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateUser(UserModel user) {

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        // Read: /users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> ReadUser(Guid id) {
            UserModel user = await _dbContext.Users.FindAsync(id);

            if(user == null) return NotFound();

            return user;
        }

    }
}
