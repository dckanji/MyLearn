
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace learn.Models
{
    public class DataContext : DbContext
    {
        /*建構函數从外部来向 DbContext 提供 DbContextOptions*/
        public DataContext(DbContextOptions<DataContext> options):base(options){}

        /**
        回傳一個資料集..User為定義的資料庫類
        */
        public DbSet<User> Users{get;set;}

        /*
        通过重写 OnConfiguring 方法或通过构造函数参数从外部来向 DbContext 提供 DbContextOptions。
        如果同时使用这两个，则 OnConfiguring 最后应用，并且可以覆盖提供给构造函数参数的选项。
        */
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //取得設定的檔案內容
            var config = new ConfigurationBuilder()
                            .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                            .AddJsonFile("appsettings.json")
                            .Build();
            Console.WriteLine(config.GetConnectionString("DefaultConnection"));  
                        
            //optionsBuilder.UseOracler(config.GetConnectionString("DefaultConnection"));
        //            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }

        /**
        覆寫資料庫實例..改變異動 資料庫屬性
        在上下文池（Context Pools）生成第一个实例时仅调用此方法一次， 然后将缓存该上下文（Context Pools）的模型，
        并且该模型适用于应用程序域中的上下文（Context Pools）的所有后续实例
        另外在做数据库迁移生成迁移文件的时候也会调用OnModelCreating方法
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //指定所有的表/存储过程/视图等属于哪一个 database schema 
            modelBuilder.HasDefaultSchema("MYTEST");

            //modelBuilder.Entity<欄位名>.HasKey(t => t.InstructorID) 设置主键关系
            //modelBuilder.Entity<欄位名>.HasKey(t => new { t.DepartmentID, t.Name }) 设置外键关系

            // 设置主外键关系 / 设置索引 / 針對欄位的處理
            //modelBuilder.HasSequence 创建Sequence

         }





    }
}