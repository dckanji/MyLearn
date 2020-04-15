import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/ 

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
