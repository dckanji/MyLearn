
using System.Data;
using learn.Repositories;
using System.Collections.Generic;
using learn.Models;
using System.Threading.Tasks;
using System;

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
        取得EFUser資料列表..回傳List<EFUser>
        */
        public List<EFUser> GetEFUserToListById(int id)
        {
            return  this.repo.EFGetEFUserToListById(id);
        }


        /**
        寫入資料..回傳資料庫異動狀態
        */
        public string EFUserInsert(EFUser efuser)
        {

            return  "ok";
        }

        /**
        建立使用者
        async方法只可以返回void，Task和Task<T>
        */
        public async Task<EFUserForEdit> EFUserInsertAsync(EFUserForEdit efuser)
        {

            //檢查帳號是否存在

            //若不存在則建立帳號
            var result = await this.repo.EFUserInsertAsync(efuser);

            //取得id
            //var efuser1 =  await "test";
           /* var user = context.HttpContext.User;
            var creatorId =  (await userManager.GetUserAsync(user)).Id
var id = (int)result.GetType().GetProperty("Id").GetValue(result, null);
*/
           // return CreatedAtAction(nameof(GetById), new { id }, result);

            return result;
        }



        /**
        更新使用者
        async方法只可以返回void，Task和Task<T>
        */
        public async Task<EFUserForEdit> EFUserUpdateAsync(EFUserForEdit efuser)
        {

            //若不存在則建立帳號
            var result = await this.repo.EFUserUpdateAsync(efuser);
            return result;
        }


        /*
        刪除使用者
        */
        public string EFUserDelete(int id)
        {
            //刪除資料
            var result = this.repo.EFUserDelete(id);
            return result;
        }





        /**
        使用EF TEST1 - 測試寫入
        */
        internal string EFTest(string runtype)
        {
            return this.repo.EFTest(runtype);
            //return "test1";
        }

        /*
        檢查帳號是否存在..傳入名稱
        */
     /*   public async Task<bool> IsAccountExistsAsync(string account)
        {
            var user;// = await userManager.FindByNameAsync(account);
            return user != null;
        }
*/



    }
}