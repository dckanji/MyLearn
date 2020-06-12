using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace learn.Models
{

    [Table("EFDEPT")]
    public class EFDept
    {

        public EFDept(){

            EFDept_FK_EFUser = new HashSet<EFUser>();//產生hashset 將EFUser資料集進行設定到此變數上

        }

        [Column("DEPT_ID")]
        public int DeptId { get; set; }

        [Column("DEPT_NO")]
        public string DeptNo { get; set; }

        [Column("DEPT_NAME")]
        public string DeptName { get; set; }


        [InverseProperty("EFUser_FK_EFDept")]//使用者類下的外鍵...設定關聯到此類
        public virtual ICollection<EFUser> EFDept_FK_EFUser { get; set; } //提供給使用者類用來關聯的


    }
}