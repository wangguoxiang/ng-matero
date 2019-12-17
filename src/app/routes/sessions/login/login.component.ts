// import { Component, OnInit } from '@angular/core';
// import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
// })
// export class LoginComponent implements OnInit {
//   reactiveForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.reactiveForm = this.fb.group({
//       username: ['', [Validators.required]],
//       password: ['', [Validators.required]],
//     });
//   }

//   ngOnInit() {}

//   login() {
//     this.router.navigateByUrl('/');
//   }
// }


import { SessionState } from './../../../core/states/session/session.store';
import { AuthenticationModel } from './../../../core/states/authentication/authentication.store';
import { MatCheckboxModule } from '@angular/material';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../core/states/authentication/authentication.service';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEXP, PASSWORD_REGEXP, CAPTCHA } from './../../../core/web.pattern';
import { Store } from '@ngxs/store';
import { SetAuthorizeStatus } from './../../../core/states/authentication/authentication.store';
//import { resetComponentState } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-signin',
  templateUrl: './login.components.html',
  styleUrls: ['./login.components.scss'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup
  email


  formErrors = {
    email: '',
    password: '',
    captcha: '',
  };

  validationMessages = {
    email: {
      required: '请输入正确的邮箱地址',
      email: '请输入正确的邮箱'
    },
    password: {
      required: '请输入您的密码',
      pattern: '密码中必须包含数字和字母',
      minlength: '请输入大于6个字符',
      maxlength: '请输入小于20个字符'
    },
    captcha: {
      required: '请输入验证码',
      minlength: '请输入6位数字的验证码',
      maxlength: '请请输入6位数字的验证码'
    }
  };

  constructor(
        private fb: FormBuilder,
        private store: Store,
        private authService: AuthenticationService,
        private router: Router,
        private elementRef: ElementRef,
        private route: ActivatedRoute,
  ) {
    this.email = this.route.snapshot.queryParams['email']
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {

    // this.isauth$ = this.store.select(state => state.authentication.authenticated)
    // if (this.isauth$ === true ) {
    //   this.router.navigate(['']);
    // }

    const email = this.email || localStorage.getItem('email')

    this.userForm = this.fb.group({
      email: [ email , Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP) ])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(PASSWORD_REGEXP), Validators.minLength(6), Validators.maxLength(20)])],
      captcha: ['',  Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      capid: [],
      remember: [ false ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  // signInWithEmail() {
  //   this.auth
  //     .emailLogin(this.userForm.value['email'], this.userForm.value['password'])
  //     .catch(error => console.log('邮箱登录出错：', error));
  // }


  login(value) {
    const loginData = Object.assign({}, value)
    localStorage.setItem('email', loginData.email)
    var captid = localStorage.getItem("capid");
    loginData.capid = captid;
    let ref = this.elementRef.nativeElement.querySelector('dt-captcha');
    ref.click();

    for (const key in this.userForm.controls) {
        if (this.userForm.controls.hasOwnProperty(key)) {
            this.userForm.controls[key].markAsDirty()
            this.userForm.controls[key].updateValueAndValidity()
        }
    }

    if (this.userForm.valid) {
       // this.cookieService.remove('TRACMANAGER')
        this.authService.login(loginData).subscribe((res) => {
          console.log(res);
          // if(res.status == 500 ){
            // let ref = this.elementRef.nativeElement.querySelector('dt-captcha');
            // ref.click();
          // }
          this.store.dispatch(SetAuthorizeStatus);
          this.router.navigate(['']);
        })
    }
  }

  // private afterSignIn() {
  //   this.router.navigate(['/']);
  // }

}
