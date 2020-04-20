using System.Data;
using learn.Repositories;

namespace learn.Services
{
    public class UserService
    {
        //後端資料提供類
        private readonly UserRepository repo;
        //建構子
        public UserService(UserRepository repo)
        {
            this.repo = repo;
        }
        //internal关键字是类型和类型成员的访问修饰符。只有在同一个程序集的文件中，内部类型或者是成员才可以访问
        //透過repo獲取資料
        internal DataTable GetUser()
        {
            return this.repo.GetUsers();
        }
    }
}