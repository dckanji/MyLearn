using System.Data;
using learn.Services;
using Microsoft.AspNetCore.Mvc;
using learn.Models;
using System;
using System.Threading.Tasks;

namespace learn.Controllers
{
    

    //配置Controller 路由類 api 前端標籤
    [Route("api/EFUser")]
    public class EFUsersController : Controller
    {
        /**
        資料庫模式 - 使用 UserService 呼叫後端 service 服務提供者
        */
        private readonly EFUserService service; //建立 service 服務提供者 物件

        /*建構子*/
        public EFUsersController(EFUserService service)
        {
            this.service = service;
        }
        
        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("EFSave")]
        public ActionResult EFSave()
        {
            //Console.WriteLine("getEFTable ***********");
            var str ="EFSave OK";
            return Json(str);           
        }//end EFSave

        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("EFDel")]
        public ActionResult EFDel()
        {
            //Console.WriteLine("getEFTable ***********");
            var str ="EFDel OK";
            return Json(str);           
        }//end EFDel

        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("EFUpdate")]
        public ActionResult EFUpdate()
        {
            //Console.WriteLine("getEFTable ***********");
            var str ="EFUpdate OK";
            return Json(str);           
        }//end EFSave




        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("getEFUserList")]
        public ActionResult getEFUserList()
        {
            //Console.WriteLine("getEFTable ***********");
            return Ok(this.service.GetEFUserToList());             

        }//end EFTest2



        /*
        取得傳入table的所有資料
        @tableName為傳入的table名稱
        */
        [HttpGet("getTableData/{tableName}")]
        public ActionResult getTableData(string tableName)
        {
            Console.WriteLine("getEFTable ***********");
            string sqlstr = "SELECT * FROM "+ tableName;
            return Ok(this.getDataToDataTable(sqlstr));             

        }//end EFTest2


        /**
        * 傳入sql語句連接資料庫..回傳DataTable
        * @sqlstr sql字串
        */
        private DataTable getDataToDataTable(string sqlstr)
        {
            //回傳
            DataTable dt = this.service.getDBData(sqlstr,"1");
            //回傳字串陣列
            return dt; 
            /* dt的文字測試模式
            for (int i = 0; i < users.Rows.Count; i++)
            {
                Console.WriteLine("**************************************");
                //Console.WriteLine("users="+users.Rows[i]["user_name"].ToString());
            }
            */
        }//end getEF


        /*
        測試呼叫 後端 EF 服務...
        */
        [HttpGet("EFTest/{runtype}")]
        public ActionResult EFTest(string runtype)
        {
            Console.WriteLine("runtype = "+runtype);
            //回傳
            var msg =this.service.EFTest(runtype);
            //DataTable users = this.service.GetUser();
            //回傳字串陣列
            return Json(msg); 

        }//end EFTest1



        /*
        MVC中ActionResult是Action的返回结果....呼叫端需要進行反序列化轉換為json格式物件
        */
        [HttpGet("TestApi{runtype}")]
        public ActionResult TestApi(string runtype) //實際FUNCTION名稱可以不同
        {
            Console.WriteLine("Test runtype = "+runtype);
            if (runtype =="1"){
                //回傳字串陣列
                var users = new User[]
                {
                    new User { Id = 1, Name= "xxxxx", Age = 11, CreationDate = DateTime.Now },
                    new User { Id = 2, Name= "ooooo", Age = 18, CreationDate = DateTime.Now },
                };
                return Ok(users);
            }else if(runtype =="2"){
                 /*
                回傳字串格式...
                前端呼叫需轉換成 {'responseType':'text'}
                如: http.get('/api/EFUser/TestEF2',{'responseType':'text'})
                注：用OkObjectResult 前台jquery自动解析为object对象，不需要进行反序列化处理
                */
                var str ="Test2 OK";
                return Ok(str);

            }else if(runtype =="3"){
                //回傳JSON格式物件...呼叫端不需要進行反序列化
                var str ="Test3 OK";
                return Json(str); 
            }
            else{
                return null;
            }
            
        }//end TestApi


    }//end  UsersController

}// end learn.Controllers