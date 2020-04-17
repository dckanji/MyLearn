
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 

/**@Component() 装饰器会把一些特定种类的元数据附加到类上，
 * 以便讓 Angular 了解这些这些类的含义以及该如何使用它们..
 * 簡單說就是讓 組件類(class MytestComponent) 和 模板(mytest.component.html) 關連起來..共同描述一個視圖
*/
@Component({
  selector: 'app-mytest',/*使用这个组件的名称 html中應用如同 <app-mytest></app-mytest>*/ 
  templateUrl: './mytest.component.html', /* html 模板的位置- 可用 template 属性的值来提供内联的 HTML 模板*/
  styleUrls: ['./mytest.component.css'] /*css 样式*/ 
  // providers:  [ HeroService ] /** 提供一个 HeroService 实例，以获取要显示的資料集列表 */
})


export class MytestComponent implements OnInit { /*实现接口*/ 

  constructor() { } /*构造函数*/

  /**服务类的范例，用于把日志记录到 浏览器的控制台(如 chrome: f12 -> consle) */
  log(msg:any){console.log(msg);}
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }

  ngOnInit() { /*初始化加载的生命周期函数*/
  }

}
