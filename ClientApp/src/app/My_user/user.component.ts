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
  //设置组件的内联模板
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

  //宣告user物件陣列..並直接填入資料
  users: User[] = [
    { id: 1, name: 'BBBBB', age: 18, date: new Date() },
    { id: 2, name: 'gggg', age: 18, date: new Date() },
    { id: 3, name: 'eeeee', age: 25, date: new Date() },
  ];
  
  //建構user物件...由api服務傳回資料..以user類別進行承接
  constructor(private http: HttpClient) {
    this.http.get<User[]>('/api/users/get-user').subscribe(data => {
      this.users = data;
    });

  }
}
