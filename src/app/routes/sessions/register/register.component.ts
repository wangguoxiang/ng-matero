// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
// })
// export class RegisterComponent implements OnInit {
//   reactiveForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.reactiveForm = this.fb.group({
//       username: ['', [Validators.required]],
//       password: ['', [Validators.required]],
//       confirmPassword: ['', [this.confirmValidator]],
//     });
//   }

//   ngOnInit() {}

//   confirmValidator = (control: FormControl): { [s: string]: boolean } => {
//     if (!control.value) {
//       return { error: true, required: true };
//     } else if (control.value !== this.reactiveForm.controls.password.value) {
//       return { error: true, confirm: true };
//     }
//     return {};
//   };
// }

import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../core/states/authentication/authentication.service';
import { PASSWORD_REGEXP } from './../../../core/web.pattern';
import { WebValidators } from './../../../core/web.validators';
import { variable } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-signup',
  templateUrl: './register.components.html',
  styleUrls: ['./register.components.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  formErrors = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  validationMessages = {
    name: {
      required: '用户名格式不正确'
    },
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
    passwordConfirm: {
      required: '请输入您的密码',
      pattern: '密码中必须包含数字和字母',
      minlength: '请输入大于6个字符',
      maxlength: '请输入小于20个字符',
      equalsTo: '两次密码不一至'
    }
  };


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildFrom();
  }

   buildFrom(){
    this.userForm = this.fb.group({
      name: [ '', Validators.compose([Validators.required])],
      email: [ '' , Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(PASSWORD_REGEXP), Validators.minLength(6), Validators.maxLength(20)])],
      passwordConfirm: ['', Validators.compose([ Validators.required, Validators.pattern(PASSWORD_REGEXP), Validators.minLength(6), Validators.maxLength(20)])],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
   }

   onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }

    this.userForm.get('passwordConfirm').setValidators(WebValidators.equalsTo(this.userForm.get('password')))
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

  register(data) {
    this.authService.registerSendEmail(data).subscribe((res) => {
        console.log(res);
        if(res.status === 200 ){
          this.router.navigate(['/']);
        }
      }
    );
  }
}
