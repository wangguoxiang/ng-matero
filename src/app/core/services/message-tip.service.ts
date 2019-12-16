// 引入需要的模块
import { Injectable } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd";
import {TranslateService} from "@ngx-translate/core";

//  注入
@Injectable({
  providedIn: 'root'
})

export class MessageTipService {


//  实例化模块
  constructor(
    private msg: NzMessageService,
    public translate: TranslateService,
  ) { }


//  封装好提示信息函数，当然前提是项目里面已经有了ie8n了，this.translate.instant()函数将自动找到对应映射翻译。
  /* *
  *   type: 提示的类型。 success成功/绿色 info提示/蓝色 warning警告/黄色 error错误/红色 loading转圈
  *   str:  提示的内容，在ie8n里对应映射
  * */
  createTips(type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string, str:string):any{
    return this.msg.create(type, this.translate.instant(str));
  }
}
