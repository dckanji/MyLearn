
import { Component, Input, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { EFUser } from '../../Models/EFUser';//引入angular類別組件
import { EfService } from '../../Service/ef.service';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-myef-userupdate',
    templateUrl: './userupdate.component.html',
    styleUrls: ['./userupdate.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserUpdate_Component{ /*实现接口*/  
       
      //宣告一個user類的物件陣列..接收父祖件的傳值
      @Input() userDetail: EFUser;
      @Input() runType: string;
      
      //建立接收前端form的欄位資料
      form = this.fb.group({
        userid: [null, Validators.required], 
        username: [null, Validators.required],
        userage: [null],
        creationdate: [null],
        deptno: [null]
        //adv_fax: ['', Validators.pattern('[^A-Za-z]+$')],//使用正则表达式进行校验
      });

      private baseUrl = '/api/EFUser/';
      private deptLists; 
      loading: boolean;
      saving: boolean;

      //构造函数-載入通用服務  
      constructor(private location: Location,//是一个 Angular 的服务，用来与浏览器打交道 稍后，你就会使用它来导航回上一个视图) 
        private efService: EfService,
        private http: HttpClient,
        private fb: FormBuilder,
        private messageService: NzMessageService
        ) 
        {} 
/*
        ngOnInit() { 
          this.getUser();
        }*/


      /**
       * 透過 heroService.getHeroes 獲取英雄列表資料
       */
      getUser(): void {
        //const id = +this.activerouter.snapshot.paramMap.get('id');
        //取得該使用者資料
        console.log("id =  ");
      }

        /**
       * 透過 heroService.getHeroes 獲取英雄列表資料
       */
      getdeptList(): void {
        this.deptLists = [
          { name: '資訊部', code: 'mis' },
          { name: '電腦部', code: 'pc' }
        ];
      }

  /**
   * 存檔後更新資料庫
   */
  save(runType: string){


/** 表單元素的操作
  //取值 username 為from上面的名稱
  this.proposalContract.advertiserId = this.advForm.get("username").value
  //设值
  this.advForm.get("disAdvertiser").setValue(this.advCon.company_name);
  //设为可编辑/可用
  this.advForm.get("selAdvertiser").enable();
  //设为不可编辑/可用
  this.advForm.get("selAdvertiser").disable();
 */
      this.baseUrl = '/api/EFUser/'+runType;
      
      if (runType = 'EFInsert'){
        //若為未輸入無效則跳回
        if (this.form.invalid) {
          return;
        }
        const request = this.create(this.form.value); //傳入表單資料到controller
        this.saving = true;
        request.subscribe({
          error: () => {
            this.saving = false;
            this.messageService.create('error', '儲存失敗');
            console.log("erro:儲存失敗");
          },
          complete: () => {
            this.saving = false;
            this.messageService.create('success', '儲存成功');
            this.form.markAsPristine();
          }
        });


        
        //return this.http.post<EFUser>(this.baseUrl, efuser);

      }
/*
      this.modalService.confirm({
      nzTitle: '你確認要存檔嗎?',
      //nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkType: 'danger',
      nzOkText: 'Yes',
      nzOnOk: () => this.efService.CallEFWebApi('/api/EFUser/'+runType).subscribe(data =>
                      console.log('data:'+data)
                    ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
    */

  }// end save

  /**新增建立資料 */
  create(data: EFUser): Observable<EFUser> {
    return this.http.post<EFUser>(this.baseUrl, data);
  }

  update(id: number, data: EFUser) {
    return this.http.put<EFUser>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  /**
   * 回上一層
   */
  goBack(): void {

    this.location.back();
  }






}//end clss

