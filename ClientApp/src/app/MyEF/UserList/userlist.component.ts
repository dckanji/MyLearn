import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../../Service/tools.service';
import { EfService } from '../../Service/ef.service';
import { ActivatedRoute, Router} from '@angular/router';
import { EFUser } from '../../Models/EFUser';//引入angular類別組件

  
@Component({
    selector: 'app-myef-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserList_Component implements OnInit { /*实现接口*/  
       
      //宣告一個user類的物件陣列
      userList: EFUser[];
      /* = [ 
                  { user_id: 1, user_name: 'AAAAAA', user_age: 18, creation_date: new Date() },
                  { user_id: 2, user_name: 'BBBBBB', user_age: 19, creation_date: new Date() },
                  { user_id: 3, user_name: 'CCCCCC', user_age: 23, creation_date: new Date() },
                ];*/
      selectedUser: EFUser;

      //构造函数-載入通用服務  
      constructor(private http: HttpClient, 
        private toolService: ToolService, 
        private efService: EfService,
        private activerouter: ActivatedRoute, //ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息
        private router: Router,) { 
        

          this.http.get<EFUser[]>('/api/EFUser/getEFUser').subscribe(data => {
            this.userList = data;
                  }
          );

      } 
        

      ngOnInit() { /*初始化加载的生命周期函数*/
        this.getUserList();
      }

      /**
       * 透過 heroService.getHeroes 獲取英雄列表資料
       */
      getUserList(): void {

        console.log('getUserList-');
/*
        this.http.get<EFUser[]>('/api/EFUser/getEFUser').subscribe(data => {
          this.userList = data;
                }
        );
*/
        //回傳user類的物件陣列
      /*  this.userList = [ 
                        { user_id: 1, user_name: 'AAAAAA', user_age: 18, creation_date: new Date() },
                        { user_id: 2, user_name: 'BBBBBB', user_age: 19, creation_date: new Date() },
                        { user_id: 3, user_name: 'CCCCCC', user_age: 23, creation_date: new Date() },
                      ];*/
/*
      this.http.get<EFUser[]>('/api/EFUser/getEFUser').subscribe(data => {
        this.userList = data;
              }
      );

*/

      }


      /**
         * 前端觸發選擇
         * @param hero 
         */
        getDetail(user: EFUser): void {
          this.selectedUser = user;
         // this.messageService.add(`Heroes主組件上的訊息輸出: 選擇的英雄ID=${hero.id} 名稱=${hero.name}`);
      }





    }//end clss