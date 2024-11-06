using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagerBackend.Controllers
{
    [Route("api")]
    public class ApiController : Controller
    {
        // Private endpoint with a specific scope requirement
        [HttpGet("private-scoped")]
        [Authorize("view:tasks")]
        public IActionResult Scoped()
        {
            return Ok(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
            });
        }
    }
}
