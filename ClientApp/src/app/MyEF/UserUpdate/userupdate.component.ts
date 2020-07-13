
import { Component, Input, OnInit } from '@angular/core'; /*引入 angular 核心*/ 
import { EFUser } from '../../Models/EFUser';//引入angular類別組件
import { EfService } from '../../Service/ef.service';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';//nz 的訊息服務
import { Observable } from 'rxjs';
import { ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined, isNumber } from 'util'; //使用“ TypeScript 定义”文件管理器

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
        userAge: [null],
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
        private nzmessageService: NzMessageService
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
        /**
         *  isNaN() 函数用于检查其参数是否為數字值..若為數字則傳回true
         *  reg.test 该值指示搜索的字符串中是否存在..用正則表達式數字格式定義
         *  === 用来检测两个操作数是否严格相等
         */
        if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
          this.age_value = value;
          //將年齡設定到form中的userAge欄位參數
          //this.form.controls['userAge'].setValue(this.age_value);
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

//**********************************按鈕 相關 function start******************************************* */

      /**
       * 存檔按鈕
       */
      save(runType: string){

          //設定連接的api路徑
          this.baseUrl = '/api/EFUser/'+runType;
          
          if (runType == 'EFInsert'){
            //若為未輸入無效則跳回
            if (this.form.invalid) {
              return;
            }

           //設定年齡的值到form變數中...若為空則可寫入預設年齡
            this.form.controls['userAge'].setValue( isNumber(this.age_value) ? this.age_value : '0' );   

            const request = this.create(this.form.value); //傳入表單資料到遠端api
            this.saving = true;//狀態為存檔中
            request.subscribe( 
              { 
                //(訂閱或監聽)異步取得http回傳的資訊
                  error: () => {
                    this.saving = false;//完成存檔
                    this.nzmessageService.create('error', '儲存失敗');
                    console.log("erro:儲存失敗");
                  },
                  complete: () => {
                    this.saving = false;//完成存檔
                    this.nzmessageService.create('success', '儲存成功');
                    this.form.markAsPristine();//markAsPristine()是将表单控件值标记为未改变，这个方法主要用在表单重置时
                  }
              });

          }//end runType = 'EFInsert'
          else if(runType == 'EFUpdate'){

              //若id沒資料則返回
              if (isNullOrUndefined(this.userDetail.userId)) {
                console.log("userDetail:"+this.userDetail.userId);
                return;
  
              }
              
              //設定連接路徑
              this.baseUrl = '/api/EFUser/'+runType;

              const request = this.update(this.userDetail.userId, this.userDetail); //傳入表單資料到遠端api
              this.saving = true;//狀態為存檔中
              request.subscribe({ //(訂閱或監聽)異步取得http回傳的資訊
                error: () => {
                  this.saving = false;//完成存檔
                  this.nzmessageService.create('error', '儲存失敗');
                  console.log("erro:儲存失敗");
                },
                complete: () => {
                  this.saving = false;//完成存檔
                  this.nzmessageService.create('success', '儲存成功');
                  console.log("success:儲存成功");
                  this.form.markAsPristine();//markAsPristine()是将表单控件值标记为未改变，这个方法主要用在表单重置时
                }
              });


          }//end runType = 'EFUpdate'
      }// end save

      /**
       * 回上一層
       */
      goBack(): void {
        this.location.back();
      }


      //**********************************按鈕 相關 function end ******************************************* */


  
//********************************** 呼叫遠端api start ******************************************* */
  /**新增建立資料 
   * @param data 新增的資料
  */
  create(data: EFUser): Observable<EFUser> {
    return this.http.post<EFUser>(this.baseUrl, data);
  }

  /**
   * 更新資料 
   * @param id 主鍵
   * @param data 異動的資料
  */
  update(id: number, data: EFUser) {
    return this.http.put<EFUser>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * 刪除資料
   * @param id 主鍵
   */
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

//********************************** 呼叫遠端api end******************************************* */



test(){

  //this.age_value = (isNaN(+this.age_value)? '0' : this.age_value);
  console.log("userDetail="+ this.userDetail.userId);

  //  console.log("form.userAge2="+this.form.controls['userAge'].value );
  //物件陣列
  var tempdata = {
    "userId" : '111',
    "username" : '222',
    "userage" : '11',
    "deptno" : 'mis',
    "creationDate" : new Date()
  }
  
  this.http.put<EFUser>('/api/EFUser/EFMyTest/'+this.userDetail.userId,this.userDetail).subscribe(data => {
    console.log(data.toString());
  })


        
/*    //另一種訊息提示
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

}//end test





}//end clss

