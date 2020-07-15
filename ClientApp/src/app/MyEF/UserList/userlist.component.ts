import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ErrorHandler} from '@angular/core'; /*引入 angular 核心*/ 
import { EfService } from '../../Service/ef.service';
import { EFUser} from '../../Models/EFUser';//引入angular類別組件
import { NzMessageService } from 'ng-zorro-antd';//nz 的訊息服務
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';//nz對話框類
import { MyEF_UserUpdateDialog_Component } from '../UserDetailDialog/userupdateDialog.component';/**測試組件-EF框架.. */
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-myef-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserList_Component implements OnInit { /*实现接口*/  
       
      //宣告一個user類的物件陣列
      userList: EFUser[];

      selectedUser: EFUser;
      runType: string;

      //构造函数-載入通用服務  
      constructor(private http: HttpClient, 
        private efService: EfService,
        private location: Location,
        private modalService: NzModalService,
        private nzmessageService: NzMessageService) { 
        
      } 
        
      ngOnInit() { /*初始化加载的生命周期函数*/
        this.getUserList();
      }

      /**
       * 獲取EFUser 的列表資料
       */
      public getUserList(): void {
        let apiurl = '/api/EFUser/getEFUserList';

        this.efService.CallEFWebApi(apiurl).subscribe(data =>{
          this.userList = data
        
        /* 資料轉向
        let distStr = 'ef_userlist';
        const _ef_testLet = { ef_testLet: [distStr] }; //後續可定義在一個通用常數類中...因此後續可以集中管理
        this.router.navigate([{outlets: _ef_testLet}]);
        */
        });//end http
      }//getUserList END

      /**
       * 獲取EFUser 的列表資料
       */
      public getUserListById(): void {
        let apiurl = '/api/EFUser/getEFUserList/';

        var id = 555;

        this.efService.CallEFWebApi(apiurl+id).subscribe(data =>{
          this.userList = data
        
        /* 資料轉向
        let distStr = 'ef_userlist';
        const _ef_testLet = { ef_testLet: [distStr] }; //後續可定義在一個通用常數類中...因此後續可以集中管理
        this.router.navigate([{outlets: _ef_testLet}]);
        */
        });//end http
      }//getUserList END



      /**
       * 重新列表 
       */
      public reLoad(): void {
        this.location.back();
        //clearInterval(this.interval);
  
      }


      /**
       * 依據table名稱獲取該table的資料列表 
       * @param tableName 傳入的table名稱如 efuser
       */
      public getTableData(tableName:string): void {
        let apiurl = '/api/EFUser/getTableData/'+tableName;

        this.efService.CallEFWebApi(apiurl).subscribe(data =>
              this.userList = data
             /* for 迴圈方式
             for (let efuser of this.userList) {
                console.log("EFUSER name="+efuser.useR_NAME); // 1, "string", false
                console.log("EFUSER TEST ="+efuser.usertest); // 1, "string", false
              }
              */
        );
      }//getTableData END


      /**
         * 查詢明細資料
         * @param hero 
         */
        getDetail(user: EFUser): void {
          this.selectedUser = user;
          this.runType = 'select';
         // this.messageService.add(`Heroes主組件上的訊息輸出: 選擇的英雄ID=${hero.id} 名稱=${hero.name}`);
      }


      /**
       * 載入更新資料組件-傳送執行類型EFUpdate
       */
      getUpdateComponent(user: EFUser): void{
        this.selectedUser = user;
        this.runType = 'EFUpdate';
        //this.router.navigate([{outlets: { ef_testLet: ['ef_update'] }}]);
      }

      /**
       * 載入更新資料組件-傳送執行類型EFInser
       */
      getAddComponent(): void{
        this.runType = 'EFInsert';
        //this.router.navigate([{outlets: { ef_testLet: ['ef_update'] }}]);
      }

      /**
       * 刪除 -呼叫後端api進行資料刪除
       */
      delete(user: EFUser){
        this.selectedUser = user;

        //刪除的提示訊息 
        this.modalService.confirm({ 
          nzTitle: '你確認要刪除嗎?',
          nzContent: '<b >'+this.selectedUser.userName+'</b>',
          nzOkType: 'danger',
          nzOkText: 'Yes',
          nzOnOk: () => 
          this.http.delete<string>('/api/EFUser/EFDelete/'+this.selectedUser.userId).subscribe({
            error: (error) => {
              this.nzmessageService.create('error', '儲存失敗'+error.error.error.message);
              console.error(error);
              console.log("erro:儲存失敗"+error.message);
            },
            complete: () => {
              this.nzmessageService.create('success', '儲存成功');
              console.log("success:儲存成功");
              this.reLoad();
            }
          }),
           
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    
      }



     /**
         * Dialog 方式載入組件進行修改資料
         * 該組件必須先宣告在module中,且進行啟動(entry)..否則將出現異常
         * entryComponents: [MyEF_UserUpdate_Component]
         * @param hero 
         */
        getUpdateDialog(user: EFUser): void {
          this.selectedUser = user;
          
          const modalref = this.modalService.create({
            nzTitle: '異動員工資料',
            nzContent: MyEF_UserUpdateDialog_Component,
            nzGetContainer: () => document.body,
            nzComponentParams: { //寫入到組件中的參數
              userid: this.selectedUser.userId.toString(),
              username: this.selectedUser.userName,
              updateUserDetail:user 
            },
            nzFooter:[
              {
                label: 'Close',
                shape: 'round',
                onClick: () => modalref.destroy()
              },
            ]
          //  nzOnOk: () => this.efService.CallEFWebApi('/api/EFUser/EFSave').subscribe(data =>
           //                 console.log('data:'+data)
           //               ),
           // nzOnCancel: () => console.log('cancel')
          });
          //const instance = modalref.getContentComponent();
          //modalref.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
          //Return a result when closed
          //modalref.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
      }



    }//end clss


   
