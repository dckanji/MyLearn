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
          var test = this.http.get<any>('/api/EFUser/TestEF2');
          console.log("test:"+test.subscribe.toString()); 
        } 
        
        testEFStatus: string[];
        
        ngOnInit() { /*初始化加载的生命周期函数*/
        
          
            
        }
    /**
     * 透過 Microsoft.AspNetCore.Mvc.RouteAttribute 的機制 取得 已經註冊的控制元件標籤 
     * /api/users/get-user...(該內容建立在UsersController.cs) 取得user物件類
     * subscribe 侦听http请求的返回，页面间传递参数..subscribe是Observable类下的一个函数
     * Observable的作用是可以起到类似监听的作用，但它的监听往往都是在跨页面中
     * 
     * C#的Lambda 表达式都使用 Lambda 运算符 =>，该运算符读为“goes to"
     * => 运算符具有与赋值运算符 (=) 相同的优先级，并且是右结合运算符
     * Lambda表达式 : subscribe(data => {this.users = data; }) =>  function(date){this.users = data;}
     * 
     * this.http.get<User[]>('/api/users/get-user') 傳回一個User[]的陣列
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
            //this.toolService.log('EF TEST.......'); 
            //  
            // this.http.get<any>('/api/EFUser/TestEF2', { observe: 'response' })

           /* this.http.get<any>('/api/EFUser/TestEF1', { observe: 'response' }).subscribe(data => {
              let response: HttpResponse<any> = data;
              let status: number = data.status;
              let statusText: string = data.statusText;
              let headers: HttpHeaders = data.headers;  
              console.log(data +"--"+ response+"--"+statusText+"--"+status+"--"+headers);
                //this.testEFStatus = data;
                 }
              );*/

              this.http.get<any>('/api/EFUser/TestEF2').subscribe(
                );
            //this.toolService.log('testef:'+this.testEFStatus); 

        }
    }