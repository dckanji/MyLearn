/**
 * 在 Angular 中，最好在一个独立的顶层模块中加载和配置路由器，它专注于路由功能，然后由根模块 AppModule 导入它
 *  AppRoutingModule 会导入RouterModule 和 Routes，以便该应用具有路由功能
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './My_user/user.component';
import { MessagesComponent }    from './messages/messages.component';/**訊息組件 */

/** 路由連接 
 * path: 用来匹配浏览器地址栏中 URL 的字符串
 * component: 导航到该路由时，路由器应该创建的组件
 * 类似于 localhost:4200/heroes 就显示 HeroesComponent。
*/
const routes: Routes = [
  { path: '', redirectTo: '/myuserbase', pathMatch: 'full'},  //預設路由
  { path: 'myuserbase', component: UserComponent}, //使用者列表from Array ..組件初次載入時,故無轉出outlet產生異常...故須保留此部分...除非載入時就移轉入myuser
  { path: 'myuserary', component: UserComponent, outlet:'myuserLet'},//使用者列表from DB 
  { path: 'myuser/:id', component: UserComponent, outlet:'myuserLet'},//使用者列表from DB 
  { path: 'api_message', component: MessagesComponent, outlet:'api_testLet' },//顯示訊息窗, outlet:'eluser'
  { path: 'api_eluser/:id', component: UserComponent, outlet:'api_testLet'},//使用者列表from DB, outlet:'eluser' 

  { path: 'ef_message', component: MessagesComponent, outlet:'ef_testLet' },//顯示訊息窗, outlet:'eluser'
  { path: 'ef_user/:id', component: UserComponent, outlet:'ef_testLet'}//使用者列表from DB, outlet:'eluser' 

];

/**
 * 将 RouterModule 添加到 AppRoutingModule 的 imports 数组中，
 * 同时通过调用 RouterModule.forRoot() 来用这些 routes 配置它
 * 
 * forRoot() 之所以這樣命名，是因为你要在应用的顶层配置这个路由器
 * forRoot() 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航。
 * 
 * exports: AppRoutingModule 导出 RouterModule，以便它在整个应用程序中生效。
 * 
 * routes為上方所配置的路徑設定
 */
@NgModule({
  imports: [ RouterModule.forRoot(
    routes
    , { enableTracing: true }) // <-- debugging purposes only)
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
