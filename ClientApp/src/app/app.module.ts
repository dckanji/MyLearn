/*
Angular 模块类描述应用的部件是如何组合在一起的。 每个应用都至少有一个 Angular 模块，也就是根模块， 
用来引导并运行应用。 
你可以为它取任何名字。常规名字是 AppModule。 也就是 app.module.ts文件 
*/
/*引入组件*/
import { BrowserModule } from '@angular/platform-browser'; /*BrowserModule，浏览器解析的模块*/ 
import { NgModule } from '@angular/core'; /*angualrjs 核心模块*/
import { FormsModule } from '@angular/forms'; /*表单数据绑定 表单验证需要的模块*/ 
import { HttpClientModule } from '@angular/common/http'; /*数据请求模块*/ 
import { RouterModule } from '@angular/router'; /* 路由模塊*/
import { CommonModule } from '@angular/common'; /** 常見模塊*/

import { AppComponent } from './app.component'; /*根组件*/

//以下為自訂的模組組件..此處必須大小寫一致,否則會有異常
import { CounterComponent } from './counter/counter.component'; /**計數器組件*/
import { FetchDataComponent } from './fetch-data/fetch-data.component';/**提取数据組件 */
import { NavMenuComponent } from './nav-menu/nav-menu.component';/**实现侧栏导航。 包含NavLink 组件 */

import { HomeComponent } from './home/home.component';
import { UserComponent } from './My_user/user.component';
import { MytestComponent } from './Mytest/mytest.component';
import { MyDemoChildComponent } from './MyDemo/Demo.Child.Component';
import { MyDemoParentComponent } from './MyDemo/Demo.Parent.Component';

/*
 @NgModule 装饰器将AppModule 标记为 Angular 模块类（也叫 NgModule 类）。 
 @NgModule 接受一个元数据对象，告诉 Angular 如何编译和启动应用。
 */ 

@NgModule({
  declarations: [ /*引入当前项目运行的的组件*/
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserComponent,
    MytestComponent,
    MyDemoChildComponent,
    MyDemoParentComponent
  ],
  imports: [ /*引入当前模块运行依赖的其他模块*/
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [], /*定义的服务  回头放在这个里面*/ 
  
  /* 指定应用的主视图（称为根组件） 通过引导根 AppModule 来启动应用  ，这里一般写的是根组件*/
  bootstrap: [AppComponent]  
})

/*根模块不需要导出任何东西，   因为其它组件不需要导入根模块。 但是一定要写*/ 
export class AppModule { }
