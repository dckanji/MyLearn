using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/*
此檔案相當於資料庫的映射類(MAPPING)
*/
namespace learn.Models
{
    [Table("EFUSER")]
    public partial class EFUser
    {
        [Key] //標示此欄位為pk
        [Column("USER_ID")] //實際對應的欄位
        public int UserId { get; set; } //程式中用的欄位

        [Column("USER_NAME")]
        public string UserName { get; set; }

        [Column("USER_AGE")]
        public int UserAge { get; set; }

        [Column("DEPT_NO")]
        public string DeptNo { get; set; }

        [Column("CREATION_DATE")]
        public DateTime CreationDate { get; set; }
        
        [ForeignKey("DeptNo")] //透過此外鍵變數傳遞
        [InverseProperty("EFDept_FK_EFUser")]//部門類下的外鍵...設定關聯到此類
        public virtual EFDept EFUser_FK_EFDept { get; set; } //宣告部門類參數

    }




}