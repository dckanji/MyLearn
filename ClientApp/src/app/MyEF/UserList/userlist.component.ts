import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../../Service/tools.service';
import { EfService } from '../../Service/ef.service';
import { ActivatedRoute, Router} from '@angular/router';
import { EFUser} from '../../Models/EFUser';//引入angular類別組件
import { UserTest } from '../../Models/UserTest';//引入angular類別組件

import { Location } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MyEF_UserUpdateDialog_Component } from '../UserDetailDialog/userupdateDialog.component';/**測試組件-EF框架.. */


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
        private toolService: ToolService, 
        private efService: EfService,
        private activerouter: ActivatedRoute, //ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息
        private router: Router,
        private location: Location,
        private modalService: NzModalService) { 
        
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
        
        //
        /*
        this.http.get<EFUser[]>('/api/EFUser/getEFUserList').subscribe(data => {
          this.userList = data;
        });//end http
              let distStr = 'ef_userlist';
        const _ef_testLet = { ef_testLet: [distStr] }; //後續可定義在一個通用常數類中...因此後續可以集中管理
        this.router.navigate([{outlets: _ef_testLet}]);

        */
        });//end http
      }//getUserList END

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
             /* for (let efuser of this.userList) {
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

      /**
       * 載入更新資料組件
       */
      getUpdateComponent(user: EFUser): void{
        this.selectedUser = user;
        this.runType = 'EFUpdate';
        //this.router.navigate([{outlets: { ef_testLet: ['ef_update'] }}]);
      }

      /**
       * 載入更新資料組件
       */
      getAddComponent(): void{
        this.runType = 'EFInsert';
        //this.router.navigate([{outlets: { ef_testLet: ['ef_update'] }}]);
      }

      /**
       * 刪除資料
       * 呼叫後端api進行相關資料的刪除
       */
      delete(user: EFUser){
        this.selectedUser = user;
        /** */
        this.modalService.confirm({
          nzTitle: '你確認要刪除嗎?',
          nzContent: '<b style="color: red;">'+this.selectedUser.userName+'</b>',
          nzOkType: 'danger',
          nzOkText: 'Yes',
          nzOnOk: () => this.http.get<any>('/api/EFUser/EFDel').subscribe(data => {
                        console.log('data:'+data)
                      }),
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    
      }




    }//end clss


   
