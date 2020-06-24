
using System.Data;
using learn.Services;
using Microsoft.AspNetCore.Mvc;
using learn.Models;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace learn.Controllers
{
    

    //配置Controller 路由類 api 前端標籤
    [Route("api/Test")]
    public class TestApiController : Controller
    {


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