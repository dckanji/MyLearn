/**
 *  Angular 模块 (Modules)描述应用的部件是如何组合在一起的。  
 *  每个应用都至少有一个 Angular 模块，也就是根模块(如NgModule类..)， 用来引导并运行应用。 
 *  該實體檔案你可以为它取任何名字。常规名字是 AppModule。 也就是 app.module.ts文件 
 * 
 */

/* 引入组件  @angular/core 表示引入相對路徑 . 表示上一層下的src
 * @angular/core => C:\00_WORKSPACE\MyLearn\ClientApp\node_modules\@angular\core
 * ./My_user/user.component => C:\00_WORKSPACE\MyLearn\ClientApp\src\app\My_user
*/
import { BrowserModule } from '@angular/platform-browser'; /*BrowserModule，浏览器解析的模块*/ 


import { NgModule } from '@angular/core'; /*angualrjs 核心模块*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/*表单数据绑定 表单验证需要的模块*/ 
import { HttpClientModule } from '@angular/common/http'; /*数据请求模块*/ 
/**
 * 路由模塊
 * Angular 的 Router 模块提供了一个服务，它可以让你定义在应用的各个不同状态和视图层次结构之间导航时要使用的路径。 
 * 它的工作模型基于人们熟知的浏览器导航约定：
 *  1.在地址栏输入 URL，浏览器就会导航到相应的页面。
 *  2.在页面中点击链接，浏览器就会导航到一个新页面。
 *  3.点击浏览器的前进和后退按钮，浏览器就会在你的浏览历史中向前或向后导航。
 *  不过路由器会把类似 URL 的路径映射到视图而不是页面。 
 *  如当用户执行一个动作时（比如点击链接），本应该在浏览器中加载一个新页面，
 *  但是路由器拦截了浏览器的这个行为，并显示或隐藏一个视图层次结构。
 * 
 * */
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; /** 常見模塊*/

import { AppComponent } from './app.component'; /*根组件*/

//以下為自訂的模組組件..此處必須大小寫一致,否則會有異常
//EftestComponent 組件名稱必須和export的組件名稱一致..否則會有異常
import { CounterComponent } from './counter/counter.component'; /**計數器組件*/
import { FetchDataComponent } from './fetch-data/fetch-data.component';/**提取数据組件 */
import { NavMenuComponent } from './nav-menu/nav-menu.component';/**实现侧栏导航。 包含NavLink 组件 */

import { MytestComponent } from './Mytest/mytest.component';/**測試組件-主要測試入口.. */
import { WebApiTestComponent } from './MyWebApiTest/webapitest.component';/**測試組件-主要測試入口.. */

import { HomeComponent } from './home/home.component'; /** 系統初始 組件 hello world */
import { UserComponent } from './My_user/user.component'; /** 測試組件-user 帳號..*/
import { MessagesComponent }    from './messages/messages.component';/**訊息組件 */
import { MyArrayComponent } from './MyArray/myarray.component';/**陣列組件.. */

import { EftestComponent } from './MyEFTest/eftest.component';/**測試組件-EF框架.. */
import { MyEF_UserList_Component } from './MyEF/UserList/userlist.component';/**測試組件-EF框架.. */
import { MyEF_UserDetail_Component } from './MyEF/UserDetail/userdetail.component';/**測試組件-EF框架.. */
import { MyEF_UserUpdate_Component } from './MyEF/UserUpdate/userupdate.component';/**測試組件-EF框架.. */
import { MyEF_UserUpdateDialog_Component } from './MyEF/UserDetailDialog/userupdateDialog.component';/**測試組件-EF框架.. */


/** 測試子母組件 */
import { MyDemoChildComponent } from './MyDemo/Demo.Child.Component';
import { MyDemoParentComponent } from './MyDemo/Demo.Parent.Component';

/*****特殊組件設定*******/
import { AppRoutingModule }     from './app-routing.module'; //路由組件
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';/**提示框訊息组件依賴項 */
import { ToastrModule } from 'ngx-toastr'; /*提示框訊息组件*/
import { NgZorroAntdModule } from 'ng-zorro-antd'; /* ngzorro 組件 */

/*nz-date-picker 的部分 locale 来自于 Angular 自身的国际化支持，需要在 app.module.ts文件中 引入相应的 Angular 语言包。 */
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);

/*
 Angular 应用是模块化的，它拥有自己的模块化系统，称作 NgModule
 一个 NgModule 就是一个容器，用于存放一些内聚的代码块，
 这些代码块专注于某个应用领域、某个工作流或一组紧密相关的功能。 
 它可以包含一些组件、服务提供者或其它代码文件，其作用域由包含它们的 NgModule 定义。 
 它还可以导入一些由其它模块中导出的功能，并导出一些指定的功能供其它 NgModule 使用

 虽然小型的应用可能只有一个 NgModule，不过大多数应用都会有很多特性模块。
 应用的根模块之所以叫根模块，是因为它可以包含任意深度的层次化子模块。

 @NgModule 装饰器(decorator)将AppModule 标记为 Angular 模块类（也叫 NgModule 类）。 
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
    MyDemoParentComponent,
    EftestComponent,
    MessagesComponent,
    MyArrayComponent,
    WebApiTestComponent,
    MyEF_UserList_Component,
    MyEF_UserDetail_Component,
    MyEF_UserUpdate_Component,
    MyEF_UserUpdateDialog_Component,
  ],
  //exports, /* 設定能在其他模塊 使用*/
  imports: [ /*引入本模块运行依赖的其他模块*/
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    /**路由配置的顺序很重要。 路由器会接受第一个匹配上导航所要求的路径的那个路由。
    当所有路由都在同一个 AppRoutingModule 时，你要把默认路由和通配符路由放在最后（这里是在 /heroes 路由后面），
    这样路由器才有机会匹配到 /heroes 路由，否则它就会先遇到并匹配上该通配符路由，并导航到“页面未找到”路由。
    */
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgZorroAntdModule
  ],
  /**
   * 本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。
   * （你也可以在组件级别指定服务提供者，这通常是首选方式。）
   */
  providers: [], 

  /**入口组件（entry component）是通过组件的类型动态加载
   * 主要可以分为引导入口组件和路由到的入口组件 */
  entryComponents: [MyEF_UserUpdateDialog_Component],
  /** 
   *  指定应用的主视图（称为根组件） 通过引导根 AppModule 来启动应用  ，这里一般写的是根组件
   *  应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性
  */
  bootstrap: [AppComponent]  
})

/*根模块不需要导出任何东西，   因为其它组件不需要导入根模块。 但是一定要写*/ 
export class AppModule { }
