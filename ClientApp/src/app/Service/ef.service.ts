import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToolService } from '../Service/tools.service';
import { User } from '../Models/User';//引入angular類別組件


@Injectable({ providedIn: 'root' })
export class EfService {

  //baseURL 定义为 :base/:collectionName 的形式。 
  //这里的 base(api指的是虛擬服務器 web api) 是要请求的资源，而 collectionName(memheroes) 是 in-memory-data-service.ts 中的英雄数据对象
  private baseUrl = '/api/EFUser/';  // URL to web api

  //msgDesc: string = 'START';; //顯示訊息
  //callType: string = '4';//測試項目
 /*users: User[] = [ //宣告一個user類的物件陣列
    { id: 1, name: 'AAAAAA', age: 18, date: new Date() },
    { id: 2, name: 'BBBBBB', age: 19, date: new Date() },
    { id: 3, name: 'CCCCCC', age: 23, date: new Date() },
  ];
  */

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  //建構子-添加私有的 messageService，其类型为 MessageService 
  //添加私有的 http，其类型为 HttpClient
  constructor( 
      private http: HttpClient, 
      private toolService: ToolService) 
    { }
    

    /**
     *  呼叫 ef後端 controller web api
     */
    CallWebApi(testType: string): Observable<any> {
        console.log('srevice-'+testType);
        //tap 该操作符会查看 Observable 中的值，使用那些值做一些事情(如比對)，并且把它们传出来
        //map（）是一个转换器，它会将结果转换为你返回的任何内容（在你的情况下 .json（））在传递给成功回调之前，你应该在其中任何一个上调用它一次。
        //map方法的作用是对每个observable对象发出的值，根据一定的规则进行映射..類似逐一進行更新資料
        //如 map(x => x + 1) 則 每一物件(物件陣列/資料集)皆+1,
        return this.http.get<any>(this.baseUrl+testType).pipe(
            tap(_ => console.log('這是TAP 傳出的')),  
            /* 
            map(data =>{   
                console.log('Test2-2-'+data);
                //this.msgDesc = data;
                return data;
                }),
                */
            catchError(this.handleError<any>('CallWebApi'))
        );
               
    }



  /**
   * 在控制台(console)报告这个错误，并返回一个无害的结果（安全值），以便应用能正常工作
   *  handleError() 方法会报告这个错误，并返回一个无害的结果（安全值），以便应用能正常工作
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.toolService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T); //使用 RxJS 的 of() 函数回傳
    };
  }




}