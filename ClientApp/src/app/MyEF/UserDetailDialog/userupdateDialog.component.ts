
import { Component, Input, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { NzModalRef} from 'ng-zorro-antd/modal';
import { EFUser } from '../../Models/EFUser';//引入angular類別組件
import { NzModalService } from 'ng-zorro-antd';
import { EfService } from '../../Service/ef.service';

@Component({
    selector: 'app-myef-userupdateDialog',
    templateUrl: './userupdateDialog.component.html',
    styleUrls: ['./userupdateDialog.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserUpdateDialog_Component implements OnInit { /*实现接口*/  
       
      //宣告一個user類的物件陣列..接收父祖件的傳值
      @Input() updateUserDetail: EFUser;
      @Input() userid?: string;
      @Input() username?: string;

      //构造函数-載入通用服務  
      constructor(private modalRef: NzModalRef,
        private modalService: NzModalService,
        private efService: EfService,
        ) 
        {} 

        ngOnInit() { /*初始化加载的生命周期函数*/
         // this.getUser();
        }


  /**
   * 存檔
   */
  save(){
    this.efService.CallEFWebApi('/api/EFUser/EFSave').subscribe(data =>
      console.log('data:'+data)
    );
    /*
    this.modalService.confirm({
     nzTitle: '你確認要存檔嗎?',
     nzContent: '<b style="color: red;">Some descriptions</b>',
     nzOkText: 'Yes',
     nzOkType: 'danger',
     nzOnOk: () => this.efService.CallEFWebApi('/api/EFUser/EFSave').subscribe(data =>
                     console.log('data:'+data)
                   ),
     nzCancelText: 'No',
     nzOnCancel: () => console.log('Cancel')
   });
   */
}



}//end clss