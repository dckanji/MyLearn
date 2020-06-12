import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../../Service/tools.service';
import { EfService } from '../../Service/ef.service';
import { ActivatedRoute, Router} from '@angular/router';
import { EFUser } from '../../Models/EFUser';//引入angular類別組件

  
@Component({
    selector: 'app-myef-userdetail',
    templateUrl: './userdetail.component.html',
    styleUrls: ['./userdetail.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserDetail_Component implements OnInit { /*实现接口*/  
       
      //宣告一個user類的物件陣列..接收父祖件的傳值
      @Input() userdetail: EFUser;

      //构造函数-載入通用服務  
      constructor(private http: HttpClient, 
        private toolService: ToolService, 
        private efService: EfService,
        private activerouter: ActivatedRoute, //ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息
        private router: Router,) { 
        
      } 
        

      ngOnInit() { /*初始化加载的生命周期函数*/
        this.getUser();
      }

      /**
       * 透過 heroService.getHeroes 獲取英雄列表資料
       */
      getUser(): void {
        const id = +this.activerouter.snapshot.paramMap.get('id');
        //取得該使用者資料
        console.log("id =  "+id);
      }





    }//end clss