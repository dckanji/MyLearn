import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../Service/tools.service';

//使用者類別
export class User {
    id: number;
    name: string;
    age: number;
    date: Date;
  }

  
@Component({
    selector: 'app-eftest',
    templateUrl: './eftest.component.html',
    styleUrls: ['./eftest.component.css'] //app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class EftestComponent implements OnInit { /*实现接口*/  
        //构造函数-載入通用服務  
        constructor(private http: HttpClient, private toolService: ToolService) { 
        } 
        
        users: User[] = [
          { id: 1, name: 'AAAAAA', age: 18, date: new Date() },
          { id: 2, name: 'BBBBBB', age: 19, date: new Date() },
          { id: 3, name: 'CCCCCC', age: 23, date: new Date() },
        ];

        testEFStatus: string = 'START';
        callType: string = '3';//測試項目

        ngOnInit() { /*初始化加载的生命周期函数*/
        }

    /**
     * 然後再透過 subscribe監聽返回方式, 將從UsersController端得到 users陣列物件傳入參數data , 
     * 再透過  this.users = data 寫入到本地的this.users物件中
     * 
     * */
        /**
         * 透過 toolService 寫入訊息組件
         * console.log 只在GOOGLE 的CHROME中 的CONSOLE 中輸出 
         * console.log("TEST..............");
         * get方法中接收的是一个接口文件的地址，它会接收接口传递过来的数据，并默认处理为json数据。
         * subscribe方法是对get接收的数据进行处理。参数 res 就是接收过来的数据对象。然后把 res 对象赋值给anyList变量。
         */
        CallEF(): void {
              
              if (this.callType =='1'){
                //若傳回為物件類-傳回一個User[]的陣列
                this.http.get<User[]>('/api/EFUser/TestEF1').subscribe( data=>{
                  this.users = data;
                  this.testEFStatus = "USER";
                  }
                );
              }
              else if (this.callType == '2'){
                //若傳回為字串則需要轉換responsetype = text 格式接收
                this.http.get('/api/EFUser/TestEF2',{'responseType':'text'}).subscribe( data=>{
                  this.testEFStatus = data;
                  }
                );
              }
              else if(this.callType =='3'){
                //若傳回為json格式或物件類則使用此方式..any可代入相應類別.
                this.http.get<any>('/api/EFUser/TestEF3').subscribe( data=>{
                  this.testEFStatus = data;
                  }
                );
              }
              console.log(this.testEFStatus);
              this.toolService.log('TEST:'+this.testEFStatus); 

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

        }
    }