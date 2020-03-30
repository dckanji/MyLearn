using System.Data;
using learn.Repositories;

namespace learn.Services
{
    public class UserService
    {
        private readonly UserRepository repo;

        public UserService(UserRepository repo)
        {
            this.repo = repo;
        }

        internal DataTable GetUser()
        {
            return this.repo.GetUsers();
        }
    }
}