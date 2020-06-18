
import { Component, Input, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { EFUser } from '../../Models/EFUser';//引入angular類別組件
import { EfService } from '../../Service/ef.service';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-myef-userupdate',
    templateUrl: './userupdate.component.html',
    styleUrls: ['./userupdate.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserUpdate_Component{ /*实现接口*/  
       
      //宣告一個user類的物件陣列..接收父祖件的傳值
      @Input() userDetail: EFUser;
      @Input() runType: string;

      //构造函数-載入通用服務  
      constructor(private location: Location,//是一个 Angular 的服务，用来与浏览器打交道 稍后，你就会使用它来导航回上一个视图) 
        private efService: EfService,
        private modalService: NzModalService
        ) 
        {} 
/*
        ngOnInit() { 
          this.getUser();
        }*/


      /**
       * 透過 heroService.getHeroes 獲取英雄列表資料
       */
      getUser(): void {
        //const id = +this.activerouter.snapshot.paramMap.get('id');
        //取得該使用者資料
        console.log("id =  ");
      }

  

  /**
   * 存檔後更新資料庫
   */
  save(runType: string){

      this.modalService.confirm({
      nzTitle: '你確認要存檔嗎?',
      //nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkType: 'danger',
      nzOkText: 'Yes',
      nzOnOk: () => this.efService.CallEFWebApi('/api/EFUser/'+runType).subscribe(data =>
                      console.log('data:'+data)
                    ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }// end save


  /**
   * 回上一層
   */
  goBack(): void {

    this.location.back();
  }






}//end clss

