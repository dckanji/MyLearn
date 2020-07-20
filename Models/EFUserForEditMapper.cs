using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/*
此檔案主要接收來自 前端呼叫傳來的物件參數....
重點為:
1.傳入的資料型態必須吻合...否則會產生為null
2.可以不完全對應傳入的參數如 只傳入其中4個也可以
3.不區分大小寫.
4.必須與前端傳來的物件參數中的變數一致...如 USERID = userid 若Userid <> User_id 則不行對不到
5.int 未對應則為0
*/
namespace learn.Models
{

    public partial class EFUserForEditMapper
    {

        public int UserId { get; set; } //程式中用的欄位

        public string UserName { get; set; }

        public Nullable<int> UserAge { get; set; }

        public string DeptNo1 { get; set; }

        public string deptno { get; set; }

         /**
         * 設定日期...故最好是文字傳文字..因文字可以傳入空值...否則就必須有日期傳入
         * 或者設定成此變數可以接受null 的日期格式 Nullable<T>
         */
        public Nullable<DateTime> CreationDate { get; set; }
        

    }




}