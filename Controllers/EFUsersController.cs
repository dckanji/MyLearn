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

            //回傳字串陣列
            var str = new String[]
                {
                    "xxxxx",
                    "ooooo"
                };
            
            return Ok(str);
        }//end TestEF1


        /*
        回傳字串格式
        */
        [HttpGet("TestEF2")]
        public ActionResult TestEF2()
        {
            // 存取後端服務 Service 
            //this.service.GetUser();
            Console.WriteLine("TestEF2***********");

            //回傳字串陣列
            var str ="TestEF2 OK";//new String("xxxxx");
            return Ok(str);
        }//end TestEF2

        /*
        回傳JSON格式物件
        */
        [HttpGet("TestEF3")]
        public ActionResult TestEF3()
        {

            //回傳字串陣列
            var str ="TestEF3 OK";//new String("xxxxx");
            return Json(str); //或前端呼叫未轉換成{'responseType':'text'} 則需要傳回json格式

        }//end TestEF3


    }//end  UsersController

}// end learn.Controllers