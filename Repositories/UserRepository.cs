using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using learn.EFDB;

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

        /**
        透過DbContext 獲取連線資料庫的連線資訊
        */
        internal DataTable GetUsersBySqlstr(string sqlstr)
        {
            MylearnDbContext mydb = new MylearnDbContext();

            using (var conn = mydb.GetDbConnection())
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

    }
}