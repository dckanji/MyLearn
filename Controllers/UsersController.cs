using System.Data;
using learn.Services;
using Microsoft.AspNetCore.Mvc;

namespace learn.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly UserService service;

        public UsersController(UserService service)
        {
            this.service = service;
        }

        [HttpGet("get-user")]
        public ActionResult GetUser()
        {
            DataTable users = this.service.GetUser();
            return Ok(users);
            

            // var users = new User[]
            // {
            //     new User { Id = 1, Name= "xxx", Age = 11, CreationDate = DateTime.Now },
            //     new User { Id = 2, Name= "ooo", Age = 18, CreationDate = DateTime.Now },
            // };
            // return Ok(users);
            //throw new System.NotImplementedException();
        }
    }
}