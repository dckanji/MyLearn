using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;

namespace learn.Repositories
{
    public class UserRepository
    {
        //連接oracle資料庫並獲取資料
        internal DataTable GetUsers()
        {
           //var connStr = "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.26.1.161)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=PDISDBPDB)));User Id=PDIS_STD;Password=PDIS_STD;";
            var connStr = "User Id=MYTEST;Password=MYTEST;Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=MYORCL11)));";
            
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

        public void SetUsers(){
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
}