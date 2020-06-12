import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../Service/tools.service';
import { EfService } from '../Service/ef.service';
import {catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router,  ParamMap} from '@angular/router';
import { User } from '../Models/User';//引入angular類別組件

  
@Component({
    selector: 'app-eftest',
    templateUrl: './eftest.component.html',
    styleUrls: ['./eftest.component.css'] //app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class EftestComponent implements OnInit { /*实现接口*/  
       
      msgDesc: string = 'START'; //顯示訊息

      //构造函数-載入通用服務  
      constructor(
        private toolService: ToolService, 
        private efService: EfService,
        private router: Router,) { 
        
      } 
        
      ngOnInit() { /*初始化加载的生命周期函数*/

      }

      //呼叫 MYEF組件(EF框架的 使用者查詢模塊)
      public CallEFUserList(): void {
        //let 為區域變數宣告
        let distStr = 'ef_userlist';
        const _ef_testLet = { ef_testLet: [distStr] }; //後續可定義在一個通用常數類中...因此後續可以集中管理
        this.router.navigate([{outlets: _ef_testLet}]);

        //this.router.navigate([{outlets: { ef_testLet: ['ef_userlist']}}]);
    }



      //網頁端呼叫
      public CallEFWebApi(testType: string): void {
          //測試EF功能
          if( (testType =='1' || testType =='2' ) ){
            this.CallServiceWebApi('EFTest/'+testType);
          }
          else{
            this.toolService.log('EF 無相應功能');
          }
          //路由輸出到
          this.router.navigate([{outlets: { ef_testLet: ['ef_message']}}]);
      }

      /**
       * 呼叫前端服務類(Angular的Service)進行呼叫Controller WebApi
       * @param testType 
       */
      private CallServiceWebApi(testType: string): void {
        //console.log('CallServiceWebApi-'+testType);

        //透過Angular的Service進行存取
        this.efService.CallWebApi(testType).subscribe(data => {
          this.msgDesc = data
          this.toolService.log('CallServiceWebApi-'+this.msgDesc);
        });
      }


    }//end clss