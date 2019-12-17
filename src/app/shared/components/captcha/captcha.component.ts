
/**
 * Created by Administrator on 2017/5/5.
 */
import { AuthenticationService } from './../../../core/states/authentication/authentication.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
    selector: 'dt-captcha',
    template: `
        <img class="captcha" [src]="captchaSrc">
        <span class="cursor-pointer" layout layout-align="center center">点击刷新</span>`,
    styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
    captchaSrc: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAAA3NCSVQICAjb4U/gAAAABlBMVEX///+ZmZmOUEqyAAAAAnRSTlMA/1uRIrUAAAAJcEhZcwAACusAAArrAYKLDVoAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDkvMjAvMTIGkKG+AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAAB1JREFUCJljONjA8LiBoZyBwY6BQQZMAtlAkYMNAF1fBs/zPvcnAAAAAElFTkSuQmCC";
    captchaid: string;

    // @Input() disabled: boolean;

    constructor(private authService: AuthenticationService) {}

    ngOnInit() {
      this.refreshCaptcha();
    }

    @HostListener('click')
    onClick() {
        console.log("click");
        this.refreshCaptcha();
    }

    refreshCaptcha() {
       this.authService.captcha()
        .subscribe((str) => {
          console.log(str);
          this.captchaid = str.meta['captchaId'];
         // Cookie.set("capid", this.captchaid);
          localStorage.setItem("capid",this.captchaid);
          this.captchaSrc = str.meta["img"];
        });
    }
}
