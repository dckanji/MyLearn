using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using learn.EFDB;
using learn.Models;
using System.Collections.Generic;
using System.Linq;
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
                //查詢user id 返回list
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
                var userlist = _context.EFUsers.AsQueryable().ToList();

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