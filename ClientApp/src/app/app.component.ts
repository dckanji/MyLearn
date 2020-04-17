/**
 * Angular 組件 (Components)
 * 每个 Angular 应用都至少有一个组件，也就是根组件(如 AppComponent )，它会把组件树和页面中的 DOM 连接起来。
 * 每个组件都会定义一个类，其中包含应用的数据和逻辑，并与一个 HTML 模板相关联，
 * 该模板定义了一个供目标环境下显示的视图。
 * 
 */

import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Template } from '@angular/compiler/src/render3/r3_ast';

/**@Component() 装饰器表明紧随它的那个类是一个组件，并提供模板和该组件专属的元数据。 
 * 装饰器是一些用于修饰 JavaScript 类的函数。  
 * Angular 定义了许多装饰器， 这些装饰器会把一些特定种类的元数据附加到类上，
 * 以便 Angular 了解这些这些类的含义以及该如何使用它们。
 * 
*/
@Component({
  selector: 'app-root', /*使用这个组件的名称 html中應用如同 <app-root></app-root>*/ 
  templateUrl: './app.component.html', /* html 模板的位置- 可用 template 属性的值来提供内联的 HTML 模板*/
  styleUrls: ['./app.component.css'] /*css 样式*/ 
})

/**
 * 模板、指令和数据绑定 Templates, directives, and data binding
 * 模板会把 HTML 和 Angular 的标记（markup）组合起来，这些标记可以在 HTML 元素显示出来之前修改它们。
 * 模板中的指令会提供程序逻辑，而绑定标记会把你应用中的数据和 DOM 连接在一起。 有两种类型的数据绑定：
 * Event binding:事件绑定让你的应用可以通过更新应用的数据来响应目标环境下的用户输入。
 * Property binding:属性绑定让你将从应用数据中计算出来的值插入到 HTML 中
 */

 /**
  * 服务与依赖注入 Services and dependency injection
  * 对于与特定视图无关并希望跨组件共享的数据或逻辑，可以创建服务类。 
  * 服务类的定义通常紧跟在 “@Injectable()” 装饰器之后。
  * 该装饰器提供的元数据可以让你的服务作为依赖被注入到客户组件中。
  * 
  * 依赖注入Dependency injection（或 DI）让你可以保持组件类的精简和高效。
  * 有了 DI，组件就不用从服务器获取数据、验证用户输入或直接把日志写到控制台，而是会把这些任务委托给服务
  */



export class AppComponent {
  title = 'app';
}
