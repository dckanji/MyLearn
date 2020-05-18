
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using learn.Models;
using System.Data.Common;

/*
此context為獨立建立並透過 複寫OnConfiguring 進行設定使用EF連接DB
*/

namespace learn.EFDB
{
    public class MylearnDbContext : DbContext
    {

        public MylearnDbContext(){}
        
        /**
        回傳一個資料集..User為定義的資料庫類
        實體TABLE
        */
        public DbSet<EFUser> EFUsers{get;set;}
        public DbSet<User> Users{get;set;}

        /* 設定連接資料庫的參數設定
        通过重写 OnConfiguring 方法从外部建立物件来向 DbContext 提供 DbContextOptions。
        如果同时使用这两个(OnConfiguring和建構函數)，则 OnConfiguring 最后应用，
        并且可以覆盖提供给构造函数参数的选项 
        */
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Console.WriteLine("OnConfiguring Start*******************************************");
            
            //使用appsettings.json取得設定的檔案內容
            var config = new ConfigurationBuilder()
                            .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                            .AddJsonFile("appsettings.json")
                            .Build();
            var connStr = config.GetConnectionString("MytestConnection");//填入設定中的名稱  
                            
            //直接設定連接資料庫字串                       
            //var connStr = "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.26.1.161)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=PDISDBPDB)));User Id=PDIS_STD;Password=PDIS_STD;";
            optionsBuilder.UseOracle(connStr);
  
            Console.WriteLine("OnConfiguring END*******************************************");

         }

        /**
        覆寫資料庫實例..改變異動 資料庫屬性
        在上下文池（Context Pools）生成第一个实例时仅调用此方法一次， 然后将缓存该上下文（Context Pools）的模型，
        并且该模型适用于应用程序域中的上下文（Context Pools）的所有后续实例
        另外在做数据库迁移生成迁移文件的时候也会调用OnModelCreating方法
        PDIS 使用此方式建立TABLE
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Console.WriteLine("OnModelCreating Start*******************************************");

            //指定所有的表/存储过程/视图等属于哪一个 database schema 
            modelBuilder.HasDefaultSchema("MYTEST");

            //modelBuilder.Entity<欄位名>.HasKey(t => t.InstructorID) 设置主键关系
            //modelBuilder.Entity<欄位名>.HasKey(t => new { t.DepartmentID, t.Name }) 设置外键关系
            //modelBuilder.Entity<EFUser>().ToTable("Act_Role");
            //modelBuilder.Entity<EFUser>().HasKey(k => k.UserId);
            //modelBuilder.Entity<EFUser>().Property(t => t.UserId).HasColumnName("UserId");
            //base.OnModelCreating(modelBuilder);


            // 设置主外键关系 / 设置索引 / 針對欄位的處理
            //modelBuilder.HasSequence 创建Sequence

            Console.WriteLine("OnModelCreating END*******************************************");
         }

        //获取此Microsoft.EntityFrameworkCore.DbContext的基础ADO.NET System.Data.Common.DbConnection。
        public DbConnection GetDbConnection()
        {
            return this.Database.GetDbConnection();
        }



    }
}