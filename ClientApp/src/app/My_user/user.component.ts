import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router,  ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';


//使用者類別
export class User {
  id: number;
  name: string;
  age: number;
  date: Date;
}

//組件畫面設計-组件装饰器：每个组件类必须用@component进行装饰才能成为Angular组件
@Component({
  //设置用于在模板中识别该组件的css选择器（组件的自定义标签）
  selector: 'app-users',
  /**
   * 设置组件的内联模板...可建立在檔案(如:user.component,ts)或直接寫在程式中
   * templateUrl: './app.component.html'
   * *ng為Angular的前端邏輯判斷語法
   * 内联 (inline)模板是包在 ECMAScript 2015 反引号 (`) 中的一个多行字符串。 
   * 反引号 (`) — 注意，不是单引号 (') — 允许把一个字符串写在多行上， 使 HTML 模板更容易阅读
   */

  template: `
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Date</th>
      </tr>
      <tr *ngFor="let user of users">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>
          <span *ngIf="user.age > 20">太大</span>
          <span *ngIf="user.age <= 20">{{user.age}}</span>
        </td>
        <td>{{user.date | date:"yyyy-MM-dd"}}</td>
      </tr>
    </table>
  `
}) //end @Component


export class UserComponent implements OnInit{

  //第一種方式...直接賦值..宣告user物件陣列..並直接填入資料...
  //測試時可註解第二種方式
  users: User[] = [
    { id: 1, name: 'AAAAAA', age: 18, date: new Date() },
    { id: 2, name: 'BBBBBB', age: 19, date: new Date() },
    { id: 3, name: 'CCCCCC', age: 23, date: new Date() },
  ];
  
  /**
 * 透過 路由快照 中取得 id參數....參數一般常為字串
 * route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后
 * paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的 id
 */


  myid:string ;

  //第二種方式....建構user物件時...由api服務傳回資料..以user類別進行承接
  constructor(
    private activerouter: ActivatedRoute, //ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息
    private router: Router,
    private http: HttpClient) {
      
      //獲取來自前端的參數
      this.myid = this.activerouter.snapshot.paramMap.get('id');
      //console.log('unavigate:'+this.myid);
      //console.log('runtypecc-'+this.route.snapshot.paramMap.get('id'));

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
     * 只適合初次載入 或初始化 時使用
     * 
     * */
    if (this.myid == "2") {
      this.http.get<User[]>('/api/users/get-userdb').subscribe(data => {
        this.users = data;
              }
      );
    }
    else{
      this.http.get<User[]>('/api/users/get-userarray').subscribe(data => {
        this.users = data;
              }
      );
    }
    
    
   // this.router.navigate([{ outlets: { test: null }}]);

  }//end constructor

  //初始化
  ngOnInit(): void {
    
    this.getUser();
    
    //console.log('url:'+this.router.navigated);
   /* console.log('unavigate:'+this.myid);
   if (this.myid == null){
      //初始化時轉向到outlet
      this.router.navigate([{outlets: { myuserLet: ['myuserary',this.myid]}}]);
    }
*/

  //初始化時轉向到outlet
  //this.router.navigate([{outlets: { myuserLet: ['myuserary']}}]);

    //清空outlet該轉向
    //this.router.navigate([{outlets: { myuserLet: null}}]);

    //含參數的轉向
    //this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);

  }
  
  
  //取值輸出
  getUser(): void {
    //從快照獲取參數
    let id = this.activerouter.snapshot.paramMap.get('id');
    console.log('client id-'+id);



    this.activerouter.params.subscribe(
      data => {
        console.log('id='+data);
     }
    )
    
      
  }




}
