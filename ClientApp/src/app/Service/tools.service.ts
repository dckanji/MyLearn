import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

//@Injectable 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样
//代表这个类将被注入到根module中。 root(根) / platform(共享平台) / any()
@Injectable({ providedIn: 'root' })
export class ToolService {
  //建構子-添加私有的 messageService，其类型为 MessageService 
  //添加私有的 http，其类型为 HttpClient
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** 
   * 透過 ToolService 寫入 訊息 緩存 裡面..顯示在訊息組件中
  */
 public log(message: string) {
    this.messageService.add(`${message}`);
  }



  
}