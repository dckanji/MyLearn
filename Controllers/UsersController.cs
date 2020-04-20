using System.Data;
using learn.Services;
using Microsoft.AspNetCore.Mvc;
using learn.Models;
using System;

namespace learn.Controllers
{
    

    //配置Controller 路由類 api 前端標籤
    [Route("api/users")]
    public class UsersController : Controller
    {
        /**
        第一種 資料庫模式 - 使用 UserService 呼叫後端 service 服務提供者
        */
        private readonly UserService service; //建立 service 服務提供者 物件

        private string dataType = "2"; //資料回傳控制 1表示 資料庫模式, 2 表示手動模式


        /*建構子*/
        public UsersController(UserService service)
        {
            this.service = service;
        }
        

        //配置Controller 路由類 api 所屬方法 標籤
        [HttpGet("get-user")]
        public ActionResult GetUser()
        {
            // 存取後端服務 Service 取得資料 
            if (dataType.Equals("1")){
                DataTable users = this.service.GetUser();
                return Ok(users);
            }
            else{//直接建立類別模式...需要引入 using learn.Models 和 using System;
                var users = new User[]
                {
                    new User { Id = 1, Name= "xxxxx", Age = 11, CreationDate = DateTime.Now },
                    new User { Id = 2, Name= "ooooo", Age = 18, CreationDate = DateTime.Now },
                };
                return Ok(users);
                //throw new System.NotImplementedException();
            }
        
        }//end getuser

    }//end  UsersController

}// end learn.Controllers