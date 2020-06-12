
using System.Data;
using learn.Repositories;
using System.Collections.Generic;
using learn.Models;

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
        傳入sql語法取得 Datatable物件資料
        @runtype 1為用command方式連接資料庫..2表示用ef方式
        */
        internal DataTable getDBData(string sqlstr, string runtype)
        {
            //傳入sql語法
            if(runtype =="1"){
                return this.repo.GetDataBySqlstr(sqlstr);
            }
            else{
                return null;
            }
        }


        /**
        取得EFUser資料列表..回傳IEnumerable<EFUser>
        */
        public IEnumerable<EFUser> GetEFUserToIEnumerable()
        {
            return  this.repo.EFGetEFUserToIEnumerable();
        }

        /**
        取得EFUser資料列表..回傳List<EFUser>
        */
        public List<EFUser> GetEFUserToList()
        {
            return  this.repo.EFGetEFUserToList();
        }




        /**
        使用EF TEST1 - 測試寫入
        */
        internal string EFTest(string runtype)
        {
            return this.repo.EFTest(runtype);
            //return "test1";
        }



    }
}