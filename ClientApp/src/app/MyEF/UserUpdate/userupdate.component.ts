
import { Component, Input, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { EFUser } from '../../Models/EFUser';//引入angular類別組件
import { EfService } from '../../Service/ef.service';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-myef-userupdate',
    templateUrl: './userupdate.component.html',
    styleUrls: ['./userupdate.component.css'] //用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件
  })

  export class MyEF_UserUpdate_Component{ /*实现接口*/  
       
      //宣告一個user類的物件陣列..接收父祖件的傳值
      @Input() userDetail: EFUser;
      @Input() runType: string;

      //private headers = new HttpHeaders({'Content-Type': 'application/json'})
      private baseUrl = '/api/EFUser/';
      age_value = '';
      age_title = 'Input a number';

      //建立接收前端form的欄位資料
      form = this.fb.group({
        userId: [null, Validators.required], 
        userName: [null, Validators.required],
        userAge: [this.age_value],
        creationDate: [null],
        deptNo: [null]
        //adv_fax: ['', Validators.pattern('[^A-Za-z]+$')],//使用正则表达式进行校验
      });



      //从模板视图中获取匹配的元素..來自html的 #inputElement..
      //ElementRef 物件是获取视图层的DOM(Document Object Model)元素..如:div/text..在浏览器中 native 元素就是 DOM 元素
      //並且宣告為 inputElement 變數
      @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

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

//**********************************表單 相關 function start******************************************* */

       /**
       * 透過 heroService.getHeroes 獲取英雄列表資料
       */
      getdeptList(): void {
        this.deptLists = [
          { name: '資訊部', code: 'mis' },
          { name: '電腦部', code: 'pc' }
        ];
      }

      /**日期選擇後觸發 */
      dateOnChange(result: Date): void {
        console.log('onChange: ', result);
      }

      /**年齡輸入後觸發 */
      ageOnChange(value: string): void {
        this.updateValue(value);
      }

      /**檢查輸入的文字是否為數字,若為數字才寫入 */
      updateValue(value: string): void {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/; //正則表達式
        if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
          this.age_value = value;
        }
        //將規整為數字的值回寫到該html dom value 元素中..需設定延遲秒數(0.5秒)否則太快會造成異常
        setTimeout(()=> {
          this.inputElement!.nativeElement.value = this.age_value;
        },500)
        //寫入到 [nzTooltipTitle] 组件
        this.updateTitle();
      }
      
      /**
       * 依據數字格式寫入到[nzTooltipTitle] 组件
       */
      updateTitle(): void {
        this.age_title = (this.age_value !== '-' ? this.formatNumber(this.age_value) : '-') || 'Input a number';
      }

      /**
       * 數字格式的轉換
       * @param value 
       */
      formatNumber(value: string): string {
        const stringValue = `${value}`;
        const list = stringValue.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while (num.length > 3) {
          result = `,${num.slice(-3)}${result}`;
          num = num.slice(0, num.length - 3);
        }
        if (num) {
          result = num + result;
        }
        return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
      }

        // '.' at the end or only '-' in the input box.
        /**
         * 失去焦點時執行..
         * slice 文字擷取 array.slice(start,end) 参数start是截取的开始数组索引，end参数等于你要取得最后一个字符的位置+1
         * charAt 返回字符串中的第幾个字符:
         */
      onBlur(): void {
        if (this.age_value.charAt(this.age_value.length - 1) === '.' || this.age_value === '-') {
          this.updateValue(this.age_value.slice(0, -1));
        }
        console.log('onBlur:'+this.age_value.slice(0, -1));
      }

//**********************************表單 相關 function end******************************************* */

      test(){
 

        let data = {
          "USERid": this.form.controls['userId'], //取得來自form的資料
          "userName": "kanji",
          "userAge": 24,
          "deptNo": "mis",
          "creationDate": new Date()
        }        
        //const request = this.create(this.form.value); //傳入表單資料到controller
        /*this.http.post('/api/EFUser/EFTestInsert', data).subscribe(data => {
          console.log(data);
        })
        */
        this.http.post('/api/EFUser/EFTestInsert', data).subscribe(data => {
          console.log(data);
        })

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

        let data = {
          "username": "zhangsan",
          "password": "123"
        }        

        //const request = this.create(this.form.value); //傳入表單資料到controller
        this.http.post('/api/EFUser/EFTestInsert', data).subscribe(data => {
          console.log(data);
        })
      }
/*
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
*/

        
        //return this.http.post<EFUser>(this.baseUrl, efuser);

      
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

