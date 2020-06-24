import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../Service/tools.service';
import { ActivatedRoute, Router,  ParamMap} from '@angular/router';
import { User } from '../Models/User';//引入angular類別組件

  
@Component({
    selector: 'app-webapitest',
    templateUrl: './webapitest.component.html',
    styleUrls: ['./webapitest.component.css'] //app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class WebApiTestComponent implements OnInit { /*实现接口*/  
       
      msgDesc: string = 'START'; //顯示訊息

      isMsgType: string;//載入msg類型

      users: User[] = [ //宣告一個user類的物件陣列
        { id: 1, name: 'AAAAAA', age: 18, date: new Date() },
        { id: 2, name: 'BBBBBB', age: 19, date: new Date() },
        { id: 3, name: 'CCCCCC', age: 23, date: new Date() },
      ];

      //构造函数-載入通用服務  
      constructor(private http: HttpClient, 
        private toolService: ToolService, 
        private router: Router,) { 
        
      } 
        

      ngOnInit() { /*初始化加载的生命周期函数*/

      }

      /**
       * 透過 toolService 寫入訊息組件
       * console.log 只在GOOGLE 的CHROME中 的CONSOLE 中輸出 
       * console.log("TEST..............");
       * get方法中接收的是一个接口文件的地址，它会接收接口传递过来的数据，并默认处理为json数据。
       * subscribe方法是对get接收的数据进行处理。参数 res 就是接收过来的数据对象。然后把 res 对象赋值给anyList变量。
       */
      public CallWebApi(testType: string): void {
            //console.log('CallWebApi-'+testType);
            let apiUrl = "/api/Test/TestApi"+testType;

            if (testType =='1'){
              //若傳回為物件類-傳回一個User[]的陣列
              this.http.get<User[]>(apiUrl).subscribe( data=>{
                this.users = data;
                this.msgDesc ="陣列數-"+this.users.length.toString();
                //this.isMsgType = 'data';
                /** 注意: 若此處輸出放http之外則會先執行..http回應完成才會執行此處
                 * 可試試放外層..會產生延遲設定顯示的效果
                 */
                //console.log('Type1:'+this.msgDesc);
                this.toolService.log('1.陣列回傳:'+this.msgDesc);
                //路由輸出到
                this.router.navigate([{outlets: { api_testLet: ['api_message']}}]);

                }
              );
            }
            else if (testType == '2'){
              //若傳回為字串, 則需轉為text 進行接收
              this.http.get(apiUrl,{'responseType':'text'})
                .subscribe(data => {
                  this.msgDesc = data
                  //console.log('Type2:'+this.msgDesc);
                  this.toolService.log('2.字串回傳:'+this.msgDesc);
                  //路由輸出到
                  this.router.navigate([{outlets: { api_testLet: ['api_message']}}]);
              });
            }
            else if(testType =='3'){
              //若傳回為json格式或物件類則使用此方式..any可代入相應類別.
              this.http.get<any>(apiUrl).subscribe( data=>{
                this.msgDesc = data;
                //console.log('Type3-'+data);
                this.toolService.log('3.json物件回傳:'+this.msgDesc);
                //路由輸出到
                this.router.navigate([{outlets: { api_testLet: ['api_message']}}]);
                }
              );
            } 
            //載入其他陣列組件
            else if(testType =='4'){
                //路由輸出到
                this.router.navigate([{outlets: { api_testLet: ['api_eluser',testType]}}]);
              
              
            } 
            else{
              //console.log('無相應功能');
              this.toolService.log('無相應功能');
              //路由輸出到
              this.router.navigate([{outlets: { api_testLet: ['api_message']}}]);
            }    


           /* 傳回RESPONSE 中的資訊
           this.http.get<any>('/api/EFUser/TestEF1', { observe: 'response' }).subscribe(data => {
              let response: HttpResponse<any> = data;
              let status: number = data.status;
              let statusText: string = data.statusText;
              let headers: HttpHeaders = data.headers;  
              console.log(data +"--"+ response+"--"+statusText+"--"+status+"--"+headers);
                //this.testEFStatus = data;
                 }
              );*/

        }//end CallWebApi

    }//end clss