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
    public class EFUsersController : ControllerBase
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
        
        [HttpPost("EFTestInsert")]
        public ActionResult EFTestInsert([FromBody] EFUserForEdit data)
        {
            Console.WriteLine("EFTestInsert ***********"+data);
            //var id = data.userId;
            var str ="EFTestInsert OK";
            //異步處理
            //await 相当于传递状态机恢复的方法。await不是等待的意思，而是在将来的某个时刻，方法恢复执行
           // var efuser = await this.service.EFUserCreateAsync(data); //如果没有await那么async修饰的函数仍然是同步执行，失去意义
            //return CreatedAtAction(str);  
            //return CreatedAtAction(nameof(GetUserByIdAsync), new { id = user.Id }, user);
            return Ok(str);         
        }//end EFSave

        /*
        HttpPost 方式寫入資料
        WebApi程序可在方法参数前加[FromBody]标识，表示该参数值应该从请求的Body中获取，而不是从URL中获取
        当参数值过大时需要用[FromBody]参数进行传输
         [FromBody] 参数不能是基本的数据类型(如byte、int、bool、DateTime、string等)
         data傳入的格式若不同或不能轉換...則傳入的物件則會變為null...如111不能轉為日期
         
       */
        [HttpPost("EFInsert")]
        public async Task<ActionResult<EFUserForEdit>> EFInsert([FromBody] EFUserForEdit data)
        {
            //Console.WriteLine("getEFTable ***********");
            var id = data.userId;

            //異步處理
            //await 相当于传递状态机恢复的方法。await不是等待的意思，而是在将来的某个时刻，方法恢复执行
           // var efuser = await this.service.EFUserCreateAsync(data); //如果没有await那么async修饰的函数仍然是同步执行，失去意义
            //return CreatedAtAction(str);  
            //return CreatedAtAction(nameof(GetUserByIdAsync), new { id = user.Id }, user);
            return Ok(data);         
        }//end EFSave

 
        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("EFDel")]
        public ActionResult EFDel()
        {
            //Console.WriteLine("getEFTable ***********");
            var str ="EFDel OK";
            return Ok(str);           
        }//end EFDel

        /*
        透過EF方式取得 EFUserList 列表資料
        */
        [HttpGet("EFUpdate")]
        public ActionResult EFUpdate()
        {
            //Console.WriteLine("getEFTable ***********");
            var str ="EFUpdate OK";
            return Ok(str);           
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
            return Ok(msg); 

        }//end EFTest1





    }//end  UsersController

}// end learn.Controllers