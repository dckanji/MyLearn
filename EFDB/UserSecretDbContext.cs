
using Microsoft.EntityFrameworkCore;
using System;
using learn.Models;
using System.Data.Common;

/*
資料庫結構
DbContext,对于经常使用DbFirst模式的开发者来说已经再熟悉不过了，EntityFramework全靠这员大将。
它的作用是代表与数据库连接的会话，提供了查询、状态跟踪、保存等功能。
还有一个重要的对象是DbSet，对实体类型提供了集合操作，比如Add、Attach、Remove。
继承了DbQuery，所以可以提供查询功能。

使用 UserSecret 方式獲取 連接 oracle 字串
*/

namespace learn.EFDB
{
    public class UserSecretDbContext : DbContext
    {
        /*建構函數由系統(Startup.cs)寫入連接參數... 提供 DbContextOptions
        連接參數來自 UserSecretsId 所設定的檔案
        %user%/%AppData%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json
        因此不用在 OnConfiguring 中設定
        */
        public UserSecretDbContext(DbContextOptions<UserSecretDbContext> options):base(options){
            var a = this.Database;
        }


        /** 設定context所使用的資料集..EFUser為定義的資料庫TABLE類 
            EFUsers 為程式中對應的 EFUser 回船或設定的 資料集變數物件
        */
        public DbSet<EFUser> EFUsers{get;set;} //ef測試使用者
        public DbSet<EFDept> EFDepts{get;set;}//部門table
        public DbSet<User> Users{get;set;}


        /**
        覆寫資料庫實例..改變異動 資料庫屬性
        在上下文池（Context Pools）生成第一个实例时仅调用此方法一次， 然后将缓存该上下文（Context Pools）的模型，
        并且该模型适用于应用程序域中的上下文（Context Pools）的所有后续实例
        另外在做数据库迁移生成迁移文件的时候也会调用OnModelCreating方法
        PDIS 使用此方式建立TABLE

        故此設定不可隨意變更
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Console.WriteLine("OnModelCreating Start*******************************************");

            //指定所有的表/存储过程/视图等属于哪一个 database schema 
            modelBuilder.HasDefaultSchema("MYTEST");

            //配置 EFUSER TABLE 实体的映射..
            modelBuilder.Entity<EFUser>(entity =>{
                //设置主键
                entity.HasKey(e => new{e.UserId})
                    .HasName("EFUSER_PK");


                //設定UNIQUE INDEX
                entity.HasIndex(e => new{e.UserId})
                        .HasName("EFUSER_PK")
                        .IsUnique();
                
                //外來鍵
                entity.HasOne( d => d.EFUser_FK_EFDept)//使用者對應的部門fk
                    .WithMany(p => p.EFDept_FK_EFUser)//部門對應使用者的fk
                    .HasForeignKey(d => d.DeptNo) //使用者的FK的傳遞變數
                    .OnDelete(DeleteBehavior.ClientSetNull) // 相當於SQL的 ON DELETE NO ACTION, 指定如果试图删除某一行，而该行的键被其他表的现有行中的外键所引用，则产生错误并回滚 DELETE 语句。
                    .HasConstraintName("EFUSER_FK"); //FK名稱

            });

            //配置 EFDEPT TABLE 实体的映射..
            modelBuilder.Entity<EFDept>(entity =>{
                //设置主键
                entity.HasKey(e => new{e.DeptNo})
                    .HasName("EFDEPT_PK");

                //設定UNIQUE INDEX
                entity.HasIndex(e => new{e.DeptNo})
                        .HasName("EFDEPT_PK")
                        .IsUnique();

            });


            Console.WriteLine("OnModelCreating END*******************************************");
         }

        //获取此Microsoft.EntityFrameworkCore.DbContext的基础ADO.NET System.Data.Common.DbConnection。
        //若要直接使用 SQL語句連接資料庫可使用此方式
        public DbConnection GetDbConnection()
        {
            return this.Database.GetDbConnection();
        }



    }
}