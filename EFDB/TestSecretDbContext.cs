
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using learn.Models;
using System.Data.Common;

/*
資料庫結構
DbContext,对于经常使用DbFirst模式的开发者来说已经再熟悉不过了，EntityFramework全靠这员大将。
它的作用是代表与数据库连接的会话，提供了查询、状态跟踪、保存等功能。
还有一个重要的对象是DbSet，对实体类型提供了集合操作，比如Add、Attach、Remove。
继承了DbQuery，所以可以提供查询功能。

*/

namespace learn.EFDB
{
    public class TestSecretDbContext : DbContext
    {
        /*建構函數由系統(Startup.cs)寫入連接參數... 提供 DbContextOptions
        連接參數來自 UserSecretsId 所設定的檔案
        %user%/%AppData%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json
        */
        public TestSecretDbContext(DbContextOptions<TestSecretDbContext> options):base(options){
            var a = this.Database;
        }

        /** 回傳資料集..User為定義的資料庫類 實體TABLE */
        public DbSet<EFUser> EFUsers{get;set;}
        public DbSet<User> Users{get;set;}


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

            Console.WriteLine("OnModelCreating END*******************************************");
         }

        //获取此Microsoft.EntityFrameworkCore.DbContext的基础ADO.NET System.Data.Common.DbConnection。
        public DbConnection GetDbConnection()
        {
            return this.Database.GetDbConnection();
        }



    }
}