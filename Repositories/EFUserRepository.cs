using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using learn.EFDB;
using learn.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/*
此檔案主要是針對EFUSER TABLE進行各項功能(新增/刪除/修改/查詢等)或抓取的設定..
相當於對該TABLE的控制類

增加Repositories 需要再Startup.cs中設定 Repositories 類
*/
namespace learn.Repositories
{

    public class EFUserRepository
    {
        private UserSecretDbContext _context; //CONTEXT參數

        public EFUserRepository(UserSecretDbContext myContext)
            {
                this._context = myContext;
            }


        /**
        透過UserSecretContext 獲取連線資料庫的連線資訊
        傳入sql字串..並回傳datatable
        */
        internal DataTable GetDataBySqlstr(string sqlstr)
        {
           
            using (var conn = _context.GetDbConnection())
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = sqlstr; //直接sql語法
                var reader = cmd.ExecuteReader();
                var dt = new DataTable();
                dt.Load(reader);
                return dt;
            }
        }


        /*
        取得使用者列表
        使用Linq查询数据时....傳回List
        */
        public List<EFUser> EFGetEFUserToList(){
            
            try{
                //取得數量
                var cnt = _context.EFUsers.Count();
                //查詢 UserId 欄位..不加上條件 返回list
                var userno = _context.EFUsers.Select( s => s.UserId.ToString()).ToList();
                
                /*  AsEnumerable是从数据库读取全部数据再在程序中查询 
                    AsQueryable是在数据库中查询再返回数据
                    AsEnumerable()是延迟执行的，实际上什么都没有发生，当真正使用对象的时候.ToList()則立即执行
                    var userlist = _context.EFUsers.AsEnumerable().ToList();
                    include 立即加载关联对象(table或欄位)..将需要的数据一次性取出，避免频繁的查询操作..
                    會完整地載入關聯資料...應避免載入完整的關聯資料避免引響執行運算
                    join 兩表不必含有外鍵關係，需要代碼手動指定連接外鍵相等（具有可拓展性，除了值相等，還能指定是>,
                    <以及其他對兩表的相應鍵的關係），以及結果欄位。
                    where 查詢條件
                    OrderByDescending( s => s.UserId); //desc排序
                    OrderBy //asc排序
                    Contains 等价于SQL中的like语句..只针对于字符串（string）类型的数据..Contains等价于like '%key%' 
                    EndsWith等价于like '%key' 确定此字符串实例的结尾是否与指定的字符串匹配
                    StartsWith等价于like 'key%'  确定此字符串实例的开头是否与指定的字符串匹配
                */
                var userlist = _context.EFUsers.OrderBy( s => s.UserId).AsQueryable().ToList();

                    // _context.Set<Tables.PdSysMenu>() //設定一個結果集到dbset 中
                //_mapper.Map<IEnumerable<PdSysMenuForSider>>(result); 設定在map中

               return (userlist.Any()) ? userlist : null; //若該物件有包含任何資料...則回傳userlist
        
            }
            catch{
                return null;
            }
        }

        /*
        依照傳入的id取得單一使用者列表
        使用Linq查询数据时....傳回List
        */
        public List<EFUser> EFGetEFUserToListById(int id){
            
            try{
                //取得數量
                var cnt = _context.EFUsers.Count();

                //依照 user id欄位加上條件 等於傳入的id  返回list
                var userlist = _context.EFUsers.Where(r => r.UserId == id).ToList();

Console.WriteLine( "testuser-*******************************************************");
                //以EFUser作table進行查詢
                var testuser = this._context.Set<EFUser>()
                    .Where(r => r.UserId == id) //查詢條件比對_efuser.UserId
                    .Select(r => new EFUserForEdit(){ //將查詢出的 EFUser 資料寫入到EFUserForEdit 物件中
                        userId = r.UserId,
                        userName = r.UserName,
                        userAge = r.UserAge,
                        creationDate = r.CreationDate,
                        deptNo = r.DeptNo
                    });
                
                //將資料集進行解開..oracle 12c 可使用 SingleOrDefault 等相關語法直接獲取資料
                foreach (EFUserForEdit str in testuser){
                    Console.WriteLine(str.userId);
                    Console.WriteLine(str.userName);
                }
                //Console.WriteLine( "testuser-"+testuser.userId);

                //相當執行 select count(*) from <table>
                Console.WriteLine( "testuser-"+testuser.Count());

Console.WriteLine( "testuser-*******************************************************");
 /*
                var userlist = _context.Set<EFUser>()
                    .Where(r => r.UserId == id)
                    .Select( s => new 
                     s.UserId.ToString(),
                     s.UserName.ToString()
                    
                    )
                    ;
                 //查詢更新後的結果..進行回傳IQueryable<EFUser>
                var result_efuser = this._context.Set<EFUser>()
                    .Where(r => r.UserId == 555) //查詢條件比對_efuser.UserId
                    .Select(r => new EFUserForEdit(){
                        userId = r.UserId,
                        userName = r.UserName,
                        userAge = r.UserAge,
                        creationDate = r.CreationDate,
                        deptNo = r.DeptNo
                    }).AsQueryable();
                    
                    //.FirstOrDefault();//返回序列中的第一条记录，如果没有记录，则返回默认值。..此功能只存在12C


                //資料庫欄位格式 轉換成 新增資料欄位..進行回傳結果
                var result = new EFUserForEdit
                {
                    userId = _efuser.UserId,
                    userName = _efuser.UserName,
                    userAge = _efuser.UserAge,
                    creationDate = _efuser.CreationDate,
                    deptNo = _efuser.DeptNo
                };
                _context.EFUsers
                    .where(r => r.UserId == id).
                OrderBy( s => s.UserId).AsQueryable().ToList();
*/
                // _context.Set<Tables.PdSysMenu>() //設定一個結果集到dbset 中
                //_mapper.Map<IEnumerable<PdSysMenuForSider>>(result); 設定在map中

               return (userlist.Any()) ? userlist : null; //若該物件有包含任何資料...則回傳userlist
        
            }
            catch{
                return null;
            }
        } 




        /*
        取得使用者列表
        使用Linq查询数据时....傳回 IEnumerable<T>来作为数据查询返回对象
        */
        public IEnumerable<EFUser> EFGetEFUserToIEnumerable(){
            
            try{
                var userlist = _context.EFUsers.OrderByDescending( s => s.UserId);
                return (userlist.Any()) ? userlist : null;
                
            }
            catch{
                return null;
            }
        }

        /**
        新增寫入EFUSER資料
        */
        public Task<EFUserForEdit> EFUserInsertAsync(EFUserForEdit efuser){

            // 同步機制傳回方式...若無此部分則會出現異常 無法將類型 'learn.Models.EFUserForEdit' 
            // 隱含轉換成 'System.Threading.Tasks.Task<learn.Models.EFUserForEdit>
            return Task<EFUserForEdit>.Run(() =>
            {
                //新增資料欄位 轉換成 資料庫欄位格式
                var _efuser = new EFUser()
                {
                    UserId = efuser.userId,
                    UserName = efuser.userName,
                    UserAge = efuser.userAge,
                    CreationDate = efuser.creationDate,
                    DeptNo = efuser.deptNo
                };
                this._context.Add(_efuser);
                this._context.SaveChanges();

                //資料庫欄位格式 轉換成 新增資料欄位..進行回傳結果
                var result = new EFUserForEdit
                {
                    userId = _efuser.UserId,
                    userName = _efuser.UserName,
                    userAge = _efuser.UserAge,
                    creationDate = _efuser.CreationDate,
                    deptNo = _efuser.DeptNo
                };
                return result;
            }); //end return Task
        } //  EFUserInsertAsync


        /**
        新增寫入EFUSER資料
        */
        public string EFInsertEFUser(){
            
            Console.WriteLine("EFInsertEFUser測試寫入*******************************************");
            //Database.SetInitializer(new DropCreateDatabaseAlways<OracleDbContext>());
            
            //建立資料庫連接物件
            MylearnDbContext mydb = new MylearnDbContext();
            using (var ctx = mydb)
            {   
                //要寫入的資料物件
                var efuser = new EFUser{
                    UserId = 22,
                    UserName = "kkkk",
                    UserAge = 20,
                    CreationDate = DateTime.Now
                };
                ctx.EFUsers.Add(efuser);//新增資料
                ctx.SaveChanges();//存檔COMMIT
            }

            Console.WriteLine("EFInsertEFUser*******************************************");
            return "EFInsertEFUser OK";
        }


        /**
        刪除EFUSER資料
        */
        public string EFUserDelete(int id){

            var status = "N";
            //若ID > 0 則進行刪除
            if (id != 0){
                EFUser _efuser = new EFUser() //依照pk建立物件...以便刪除相應主鍵的資料
                    {
                    UserId =  id 
                    };
                this._context.Remove(_efuser);
                this._context.SaveChanges(); 
                status = "Y";//表示已刪除
            }
            return status;
        }

        /**
        更新EFUSER資料
        */
        public Task<EFUserForEdit> EFUserUpdateAsync(EFUserForEdit efuser){

            // 同步機制傳回方式...若無此部分則會出現異常 無法將類型 'learn.Models.EFUserForEdit' 
            // 隱含轉換成 'System.Threading.Tasks.Task<learn.Models.EFUserForEdit>
            return Task<EFUserForEdit>.Run(() =>
            {
                //更新的資料欄位 轉換成 資料庫欄位格式
                var _efuser = new EFUser()
                {
                    UserId = efuser.userId,
                    UserName = efuser.userName,
                    UserAge = efuser.userAge,
                    CreationDate = efuser.creationDate,
                    DeptNo = efuser.deptNo
                };
                //將對應後的資料庫欄位放入ef容器中..並逐一針對所有欄位設定
                //因為若不寫則更新時會變為null
                this._context.Entry(_efuser).Property(r => r.UserName).IsModified = true;
                this._context.Entry(_efuser).Property(r => r.UserAge).IsModified = true;
                this._context.Entry(_efuser).Property(r => r.CreationDate).IsModified = true;
                this._context.Entry(_efuser).Property(r => r.DeptNo).IsModified = true;
                this._context.SaveChanges();


                //查詢更新後的結果..進行回傳IQueryable<EFUser>
                /*var result_efuser = this._context.Set<EFUser>()
                    .Where(r => r.UserId == 555) //查詢條件比對_efuser.UserId
                    .Select(r => new EFUserForEdit(){
                        userId = r.UserId,
                        userName = r.UserName,
                        userAge = r.UserAge,
                        creationDate = r.CreationDate,
                        deptNo = r.DeptNo
                    }).AsQueryable();
                    */
                    //.FirstOrDefault();//返回序列中的第一条记录，如果没有记录，则返回默认值。..此功能只存在12C


                //資料庫欄位格式 轉換成 新增資料欄位..進行回傳結果
                var result = new EFUserForEdit
                {
                    userId = _efuser.UserId,
                    userName = _efuser.UserName,
                    userAge = _efuser.UserAge,
                    creationDate = _efuser.CreationDate,
                    deptNo = _efuser.DeptNo
                };
                return result;
            }); //end return Task
        }


//******************************* TEST SPACE START ************************


        /*
        測試function
        */
        public string EFTest(string runtype){
            
            Console.WriteLine("EF Repository OK*******************************************");
            return "Repository OK runtype:"+runtype;
        }

//******************************* TEST SPACE END ************************



        
    }
}