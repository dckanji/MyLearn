using System.Data;
using learn.Services;
using Microsoft.AspNetCore.Mvc;
using learn.Models;
using System;

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
        MVC中ActionResult是Action的返回结果....呼叫端需要進行反序列化轉換為json格式物件
        */
        [HttpGet("Test1")]
        public ActionResult Test1()
        {
            Console.WriteLine("Test1*********");
            //回傳字串陣列
            var users = new User[]
            {
                new User { Id = 1, Name= "xxxxx", Age = 11, CreationDate = DateTime.Now },
                new User { Id = 2, Name= "ooooo", Age = 18, CreationDate = DateTime.Now },
            };
            return Ok(users);
        }//end Test1


        /*
        回傳字串格式...
        前端呼叫需轉換成 {'responseType':'text'}
        如: http.get('/api/EFUser/TestEF2',{'responseType':'text'})
        */
        [HttpGet("Test2")]
        public ActionResult TestTEST2() //實際FUNCTION名稱可以不同
        {
            Console.WriteLine("Test2***********");
            //回傳字串陣列
            var str ="Test2 OK";
            return Ok(str);
        }//end Test2

        /*
        回傳JSON格式物件...呼叫端不需要進行反序列化
        */
        [HttpGet("Test3")]
        public ActionResult Test3()
        {
            Console.WriteLine("Test3***********");
            //回傳字串陣列
            var str ="Test3 OK";
            return Json(str); 

        }//end Test3



        /*
        測試呼叫 後端 EF 服務...在SCHEMA下建立TABLE
        */
        [HttpGet("EF1")]
        public ActionResult EF1()
        {
            Console.WriteLine("EF1***********");
            //回傳
            var msg =this.service.EFTest1();
            //DataTable users = this.service.GetUser();

            //回傳字串陣列
            return Json(msg); 

        }//end EFTest1


        [HttpGet("EF2")]
        public ActionResult EF2()
        {
            Console.WriteLine("EF2***********");
             //回傳
            var msg =this.service.EFTest2();
            //DataTable users = this.service.GetUser();

            //回傳字串陣列
            return Json(msg); 

        }//end EFTest2


        

    }//end  UsersController

}// end learn.Controllers