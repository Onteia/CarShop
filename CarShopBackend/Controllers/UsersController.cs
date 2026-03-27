using Microsoft.AspNetCore.Mvc;
using CarShopBackend.Data;

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
        public async Task<ActionResult<AppUser>> CreateUser(AppUser user) {

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        // Read: /users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> ReadUser(Guid id) {
            AppUser user = await _dbContext.Users.FindAsync(id);

            if(user == null) return NotFound();

            return user;
        }

    }
}
