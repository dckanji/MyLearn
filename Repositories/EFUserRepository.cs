using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using learn.EFDB;


using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.Data.Common;
/*using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Migrations;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Migrations.History;
*/
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
           
            using (var conn = new MylearnDbContext().GetDbConnection())
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


        public string EFTest1(){
            
            Console.WriteLine("REP EFTest1-1*******************************************");
            
           

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

        public string TestSecret(){
            
            Console.WriteLine("TestSecret START *******************************************");
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
            }
            Console.WriteLine("TestSecret END*******************************************");
            return "EFTEST1 OK";
        }


        /**
        使用EF進行存取
        */
        public string SetEFUsers(){

                       return "REP SetEFUser OK";
        }
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