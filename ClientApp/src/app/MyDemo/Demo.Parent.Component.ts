import { Component, Input } from '@angular/core';
/**
 * 父組件  test
 * 父组件在其模板中通过选择器demo-child引用子组件DemoChildComponent，
 * 并通过子组件的两个输入属性paramOne和paramTwo向子组件传递数据，
 * 最后在子组件的模板中就显示传递给paramOne的数据和传递给paramTwo的数据这两行文本。
 * */

@Component({
    selector: 'MyDemo-parent',
    template: `
      <MyDemo-child [paramOne]='paramOneVal' [paramTwo]='paramTwoVal'></MyDemo-child>
    `
  })
  export class MyDemoParentComponent {
      paramOneVal: any = '传递给paramOne的数据';
      paramTwoVal: any = '传递给paramTwo的数据';
  }