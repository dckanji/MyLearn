using System;
using System.Data;
using Oracle.ManagedDataAccess.Client;

namespace learn.Repositories
{
    public class UserRepository
    {
        internal DataTable GetUsers()
        {
            var connStr = "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.26.1.161)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=PDISDBPDB)));User Id=PDIS_STD;Password=PDIS_STD;";
            using (var conn = new OracleConnection(connStr))
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM STD_USER";
                var reader = cmd.ExecuteReader();
                var dt = new DataTable();
                dt.Load(reader);
                return dt;
            }
        }
    }
}