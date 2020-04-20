import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
})
export class UserComponent {

  //第一種方式...直接賦值..宣告user物件陣列..並直接填入資料
  users: User[] = [
    { id: 1, name: 'BBBBB', age: 18, date: new Date() },
    { id: 2, name: 'gggg', age: 18, date: new Date() },
    { id: 3, name: 'eeeee', age: 25, date: new Date() },
  ];
  
  //第二種方式....建構user物件時...由api服務傳回資料..以user類別進行承接
  constructor(private http: HttpClient) {
    /**
     * 透過 Microsoft.AspNetCore.Mvc.RouteAttribute 的機制 取得 已經註冊的控制元件標籤 
     * /api/users/get-user...(該內容建立在UsersController.cs) 取得user物件類
     * subscribe 侦听http请求的返回，页面间传递参数..subscribe是Observable类下的一个函数
     * Observable的作用是可以起到类似监听的作用，但它的监听往往都是在跨页面中
     * 
     * C#的Lambda 表达式都使用 Lambda 运算符 =>，该运算符读为“goes to"
     * => 运算符具有与赋值运算符 (=) 相同的优先级，并且是右结合运算符
     * Lambda表达式 : subscribe(data => {this.users = data; }) =>  function(date){this.users = data;}
     * 意思是抓取到 物件值(data) 逐一寫入到 this.users中
     * */
    this.http.get<User[]>('/api/users/get-user').subscribe(data => {
                                                            this.users = data;
                                                                  }
                                                          );



  }
  
}
