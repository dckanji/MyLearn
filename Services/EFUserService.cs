using System.Data;
using learn.Repositories;

/*
增加SERVICE 需要再Startup.cs中設定服務類
*/
namespace learn.Services
{
    public class EFUserService
    {
        //後端資料提供類
        private readonly EFUserRepository repo;

        //建構子
        public EFUserService(EFUserRepository repo)
        {
            this.repo = repo;
        }
        /**
        使用EF進行存取
        */
        internal string SetEFUser()
        {
            return this.repo.SetEFUsers();
            //return "test";
        }

        /**
        使用EF TEST
        */
        internal void Test1()
        {
            //this.repo.EFTest1();
            this.repo.TestSecret();
            //return "test";
        }


        //internal关键字是类型和类型成员的访问修饰符。只有在同一个程序集的文件中，内部类型或者是成员才可以访问
        //透過repo獲取資料
       /* internal DataTable GetUser()
        {
            return this.repo.GetUsers();
        }
*/

    }
}