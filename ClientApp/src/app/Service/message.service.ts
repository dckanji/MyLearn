import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  mesType: string;

//往缓存中添加一条消息
  add(message: string) {
    this.messages.push(message);
    this.mesType ='msg';
  }

  //呈現其他組件...傳入物件
  addData(message: string) {
    this.messages.push(message);
    this.mesType ='data';
  }
  

//清空缓存
  clear() {
    this.messages = [];
  }
}
