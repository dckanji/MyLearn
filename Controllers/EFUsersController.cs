using System.Data;
using learn.Services;
using Microsoft.AspNetCore.Mvc;
using learn.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading;

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
        public EFUsersController(EFUserService service
       
        )
        {
            this.service = service;

        }



        /*
        新增資料-傳入異動的資料物件..
        WebApi程序可在方法参数前加[FromBody]标识，表示该参数(data)是从请求的Body中获取，而不是从URL中获取
        当参数值过大或多個時需要用[FromBody]参数进行传输
         [FromBody] 参数不能是基本的数据类型(如byte、int、bool、DateTime、string等)
         data傳入的格式若不同或不能轉換...則傳入的物件則會變為null...如111不能轉為日期

         Task 跟线程池ThreadPool的功能类似，用Task开启新任务时，会从线程池中调用线程..做完才結束
         Task<TResult>就是有返回值的Task，TResult就是返回值类型 
       */
        [HttpPost("EFInsert")]
        public async Task<ActionResult<EFUserForEdit>> EFInsert([FromBody] EFUserForEdit data)
        {
            Console.WriteLine("EFInsert ***********"+nameof(data.userId));
            var id = data.userId;

            /*
            異步處理 用途資料庫異動完才回傳完成了...
            async用来修饰方法，表明这个方法是异步的，声明的方法的返回类型必须为：void，Task或Task<TResult>
            await必须用来修饰Task或Task<TResult>，而且只能出现在已经用async关键字修饰的异步方法中。
                通常情况下，async/await成对出现才有意义，
            await 相当于传递状态机恢复的方法。await不是等待的意思，而是在将来的某个时刻，方法恢复执行
            若没有await那么async修饰的函数仍然是同步执行，失去意义
            */
            //新增寫入-異步
            var result = await this.service.EFUserInsertAsync(data);

 
            //nameof(data.userId)輸出變數名稱 
            //新增完成後..導向到新建的網頁資料上..创建一个CreatedAtActionResult对象，该对象生成Status201Created响应 201 (已创建) 请求成功并且服务器创建了新的资源
            //CreatedAtAction(<action_name>, <route_value> ,<return_data_object>)
            //var action = CreatedAtAction(nameof(data.userId), new{id} , data);
 
            //return   action;
Console.WriteLine("EFInsert ***********方法执行结束2");
            //return CreatedAtAction(nameof(GetUserByIdAsync), new { id = user.Id }, user);
            return Ok(data); 
        }//end EFInsert

         /*
        更新資料api-  傳入url id 和 異動的資料物件..
        */
        [HttpPut("EFUpdate/{id}")]
        public async Task<ActionResult<EFUserForEdit>> EFUpdate(int id, [FromBody] EFUserForEdit data)
        {
            Console.WriteLine("EFUpdate ***********"+data+" - "+id);
            try
            {
                if (data == null)
                {
                    return Unauthorized();//回傳 http status 401 未經過授權
                }
                //var str = await GetString();
                //呼叫後端執行更新異步
                var result = await this.service.EFUserUpdateAsync(data);

                return Ok(result); //回傳http status 200
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);//回傳 http status 404 無資料並輸出錯誤資訊
            }
                    
        }//end EFUpdate

         /*
        刪除資料api-  傳入url id 和 異動的資料物件..
        */
        [HttpDelete("EFDelete/{id}")]
        public ActionResult EFDelete(int id)
        {
            
            try
            {
                Console.WriteLine("EFUpdate ***********"+id);
                //呼叫後端執行刪除
                var startus = this.service.EFUserDelete(id);

                return Json(startus);//文字串回傳要先轉成JSON或  前端加上{'responseType':'text'} 否則會異常
                //return Ok(startus);
                //return BadRequest();//回傳 http status 400 請求錯誤
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
       
        }//end EFUpdate

        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("getEFUserList")]
        public ActionResult getEFUserList()
        {
            var result = this.service.GetEFUserToList();

            if (result == null)
            {
                return NotFound(); //回傳 http status 404 無資料
            }

            //Console.WriteLine("getEFTable ***********");
            return Ok(result);             

        }//end EFTest2

        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("getEFUserList/{id}")]
        public ActionResult getEFUserListById(int id)
        {
            var result = this.service.GetEFUserToListById(id);

            if (result == null)
            {
                return NotFound(); //回傳 http status 404 無資料
            }

            //Console.WriteLine("getEFTable ***********");
            return Ok(result);             

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




/***********************以下為測試function start***************************************************/
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
            return Ok(msg); 

        }//end EFTest1


        /*
        [HttpPut("{id}")]
         [HttpDelete("{id}")]
        */
        [HttpPut("EFMyTest/{id}")]
        public ActionResult EFMyTest(int id, [FromBody] EFUserForEdit data)
        {
            Console.WriteLine("EFMyTest ***********"+data+" - "+id);
            //var id = data.userId;
            var str ="EFMyTest OK";
            //異步處理
            //await 相当于传递状态机恢复的方法。await不是等待的意思，而是在将来的某个时刻，方法恢复执行
           // var efuser = await this.service.EFUserCreateAsync(data); //如果没有await那么async修饰的函数仍然是同步执行，失去意义
            //return CreatedAtAction(str);  
            //return CreatedAtAction(nameof(GetUserByIdAsync), new { id = user.Id }, user);
            return Ok(str);         
        }//end EFSave


        /*
        同步機制傳回方式
        */
        static Task<string> GetString()
        {
            // 需要使用 task 方式執行..並傳回相同物件類型
            return Task<string>.Run(() =>
            {
                Thread.Sleep(2000);
                return "GetString的返回值";
            });
        }


/***********************測試function end***************************************************/

    }//end  UsersController

}// end learn.Controllers