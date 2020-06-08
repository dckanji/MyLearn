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
        傳入sql語法取得 資料
        */
        internal DataTable getDBData(string sqlstr, string runtype)
        {
            //傳入sql語法
            if(runtype =="1"){
                return this.repo.GetDataBySecretContext(sqlstr);
            }
            else{
                return null;
            }
            
            //this.repo.TestSecret();
            //return "test";
        }

        /**
        使用EF TEST1
        */
        internal string EFTest1()
        {
            return this.repo.EFTest1();
            //this.repo.TestSecret();
            //return "test";
        }

        /**
        使用EF TEST2
        */
        internal string EFTest2()
        {
            return this.repo.EFTest2();
            //this.repo.TestSecret();
            //return "test";
        }




    }
}