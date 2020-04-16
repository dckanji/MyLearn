import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 

/**@Component() 装饰器会把一些特定种类的元数据附加到类上，
 * 以便 Angular 了解这些这些类的含义以及该如何使用它们。
*/
@Component({
  selector: 'app-mytest',/*使用这个组件的名称*/ 
  templateUrl: './mytest.component.html', /*html 模板*/
  styleUrls: ['./mytest.component.css'] /*css 样式*/ 
})


export class MytestComponent implements OnInit { /*实现接口*/ 

  constructor() { } /*构造函数*/

  ngOnInit() { /*初始化加载的生命周期函数*/
  }

}
