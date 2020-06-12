/** 
 * typescript的寫法,如同建立一個 映射類
 * 可承接來自http端的資料結構
 * 若是直接回傳Datatable則不分大小寫...但不能含底線 若含底線則會變成此狀況..useR_NAME: string;
 * 若是回傳後端EFUSER物件 LIST<EFUser>格式..則需要和後端物件變數一致
*/
export class EFUser {
    userId: number;
    userName: string;
    userAge: number;
    creationDate: Date;
    deptNo:  string;
}