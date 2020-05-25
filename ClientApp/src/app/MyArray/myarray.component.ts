import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router,  ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../Models/User';//引入angular類別組件


//組件畫面設計-组件装饰器：每个组件类必须用@component进行装饰才能成为Angular组件
@Component({
  //设置用于在模板中识别该组件的css选择器（组件的自定义标签）
  selector: 'app-myarray',
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


export class MyArrayComponent implements OnInit{

    //第一種方式...直接賦值..宣告user物件陣列..並直接填入資料...
    users: User[];
    
    private myid:string ;
  
    //第二種方式....建構user物件時...由api服務傳回資料..以user類別進行承接
    constructor(
      private activerouter: ActivatedRoute, //ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息
      private router: Router,
      private http: HttpClient) {
        
            //獲取來自呼叫端的參數
            this.myid = this.activerouter.snapshot.paramMap.get('id');
            //console.log('unavigate:'+this.myid);
            //console.log('runtypecc-'+this.route.snapshot.paramMap.get('id'));
            //透過回傳的陣列進行輸出
            if (this.myid == "4") {
                this.http.get<User[]>('/api/EFUser/Test1').subscribe(data => {
                    this.users = data;

                  }
                );
            }//end if

        }//end constructor

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }


}


      

    
    

  

  