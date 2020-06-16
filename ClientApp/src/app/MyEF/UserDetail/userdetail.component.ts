import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core'; /*引入 angular 核心*/ 
import { ToolService } from '../../Service/tools.service';
import { EfService } from '../../Service/ef.service';
import { ActivatedRoute, Router} from '@angular/router';
import { EFUser } from '../../Models/EFUser';//引入angular類別組件
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
        private location: Location,//是一个 Angular 的服务，用来与浏览器打交道 稍后，你就会使用它来导航回上一个视图) 
        private toastrService: ToastrService
        ) 
        {} 
        

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



  /**
   * 回上一層
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * 存檔
   */
  save(){
     /* this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
        */
       this.toastrService.info('info提示', '这已经是第一页了');
       this.toastrService.success('success提示', '这已经是第一页了',{
         closeButton: true,
         positionClass: "toast-bottom-center"
        })
        ;

        this.toastrService.warning('warning提示', '这已经是第一页了');
        this.toastrService.error('error提示', '这已经是第一页了');
        
  }

  



}//end clss