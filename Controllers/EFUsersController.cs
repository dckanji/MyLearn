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
        第一種 資料庫模式 - 使用 UserService 呼叫後端 service 服務提供者
        */
        private readonly UserService service; //建立 service 服務提供者 物件


        /*建構子*/
        public EFUsersController(UserService service)
        {
            this.service = service;
        }
        

        //配置Controller 路由類 api 所屬方法 標籤
        /*
        MVC中ActionResult是Action的返回结果..回傳為json格式物件
        */
        [HttpGet("TestEF1")]
        public ActionResult TestEF1()
        {
            // 存取後端服務 Service 
            //this.service.GetUser();
            Console.WriteLine("TestEF1*********");
            //string str = "EF USER ...ok";

            //回傳字串陣列
            var str = new String[]
                {
                    "xxxxx",
                    "ooooo"
                };
            //var teststr = new String("xxx");
            return Ok(str);
        }//end getuser


        /*
        MVC中ActionResult是Action的返回结果
        */
        [HttpGet("TestEF2")]
        public ActionResult TestEF2()
        {
            // 存取後端服務 Service 
            //this.service.GetUser();
            Console.WriteLine("TestEF2***********");
            //string str = "EF USER ...ok";

            //回傳字串陣列
            var str ="ok";//new String("xxxxx");

            //var teststr = new String("xxx");
            return Ok(str);
        }//end getuser


    }//end  UsersController

}// end learn.Controllers