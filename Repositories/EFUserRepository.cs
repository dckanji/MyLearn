using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using learn.EFDB;
using learn.Models;

using System.Data.Common;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace learn.Repositories
{

    public class EFUserRepository
    {
        private TestSecretDbContext _context;

        public EFUserRepository(TestSecretDbContext myContext)
            {
                this._context = myContext;
            }


        //連接oracle資料庫並獲取資料
        internal DataTable GetUsers()
        {
            var connStr = "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.26.1.161)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=PDISDBPDB)));User Id=PDIS_STD;Password=PDIS_STD;";
            //var myorcl = "User Id=MYTEST;Password=MYTEST;Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=MYORCL11)));";
            
            using (var conn = new OracleConnection(connStr))
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM STD_USER"; //直接sql語法
                var reader = cmd.ExecuteReader();
                var dt = new DataTable();
                dt.Load(reader);
                return dt;
            }
        }

        /**
        透過DbContext 獲取連線資料庫的連線資訊
        */
        internal DataTable GetUsersByContext()
        {
            MylearnDbContext mydb = new MylearnDbContext();

            using (var conn = mydb.GetDbConnection())
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM STD_USER"; //直接sql語法
                var reader = cmd.ExecuteReader();
                var dt = new DataTable();
                dt.Load(reader);
                return dt;
            }
            
        }

        /**
        透過TestSecretContext 獲取連線資料庫的連線資訊
        */
        internal DataTable GetUsersBySecretContext()
        {
           
            using (var conn = _context.GetDbConnection())
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM STD_USER"; //直接sql語法
                var reader = cmd.ExecuteReader();
                var dt = new DataTable();
                dt.Load(reader);
                return dt;
            }
        }


        /**
        透過TestSecretContext 獲取連線資料庫的連線資訊
        */
        internal DataTable GetDataBySecretContext(string sqlstr)
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



        /**
        使用EF進行存取
        */
        public string SetEFUsers(){

            return "REP SetEFUser OK";
        }


//******************************* TEST SPACE START ************************

        public string EFTest1(){
            
            Console.WriteLine("REP EFTest1-測試寫入*******************************************");
            
            //Database.SetInitializer(new DropCreateDatabaseAlways<OracleDbContext>());
            
            //建立資料庫連接物件
            MylearnDbContext mydb = new MylearnDbContext();

            using (var ctx = mydb)
            {   
                //要寫入的資料物件
                var efuser = new EFUser{
                    Id = 22,
                    Name = "kkkk",
                    Age = 20,
                    CreationDate = DateTime.Now
                };

                ctx.EFUsers.Add(efuser);//新增資料
                ctx.SaveChanges();//存檔COMMIT
            }

            Console.WriteLine("寫入ok");

            /*MylearnDbContext _context = new MylearnDbContext();
            
            using (var conn = _context.GetDbConnection())
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM STD_USER"; //直接sql語法
                var reader = cmd.ExecuteReader();
                var dt = new DataTable();
                dt.Load(reader);
          
                Console.WriteLine("DB COUNT-"+dt.Rows.Count);
                //return dt;
            }*/
            //Database.SetInitializer(new DropCreateDatabaseAlways<OracleDbContext>());

           // int count = _context.Users.Remove.;
            //int count = _context.EFUsers.GetType().;

           
            Console.WriteLine("REP EFTest1-2*******************************************");
            return "EFTEST1 OK";
        }

        public string EFTest2(){
            
            Console.WriteLine("Test2 START *******************************************");
        
            Console.WriteLine("Test2 END*******************************************");
            return "EFTEST2 OK";
        }

//******************************* TEST SPACE END ************************


/*
            Database.SetInitializer(new DropCreateDatabaseAlways<OracleDbContext>());
22 
23             using (var ctx = new OracleDbContext())
24             {
25                 var emp = new Employee
26                 {
27                     Name = "Tom",
28                     HireDate = DateTime.Now
29                 };
30 
31                 ctx.Employees.Add(emp);
32                 ctx.SaveChanges();
33 
34                 var dept = new Department
35                 {
36                     Name = "Accounting",
37                     ManagerId = emp.EmployeeId
38                 };
39 
40                 ctx.Departments.Add(dept);
41                 ctx.SaveChanges();
*/

        
    }
}