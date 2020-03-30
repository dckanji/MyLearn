import { Component, Input } from '@angular/core';
/**
 * 子組件
 * 建立 組件的命令 ng generate component heroes
 * 
 * 子组件通过@Input()定义输入属性paramOne和paramTwo（属性值可以为任意数据类型）
 * */

@Component({
    selector: 'MyDemo-child',
    template: `
      <p>1241{{paramOne}}</p>
      <p>1445{{paramTwo}}</p>
    `
  })

  export class MyDemoChildComponent {
      private paramOneVal: any;//any任一類型都可
      

      @Input()
        set paramOne (val: any) { // 输入属性1
          this.paramOneVal = val;
          // do something 預計要作的事情
        };
        get paramOne () { //傳回值
            return this.paramOneVal;
        };


      @Input() paramTwo: any; // 输入属性2
      

  }