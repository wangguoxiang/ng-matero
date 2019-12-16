import { Injectable } from '@angular/core';
import { ApiAddress, ApiV2Address } from '../../web.api';
import { map, tap } from 'rxjs/internal/operators';
import { OpsResponse } from '../../settings';
import { HttpClient } from '@angular/common/http';
import { Logout } from './authentication.store';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private store: Store,
        private router: Router,
    ) {
    }

    login(data) {
        return <Observable<OpsResponse<any>>>this.http.post(ApiAddress.LOGIN, data)
    }

    logout() {
        return this.http.get(ApiAddress.LOGOUT).pipe(tap(() => {
            this.router.navigate(['sigin']).then(() => {
                this.store.dispatch(new Logout())
            })
        }))
    }
    //取验证码
    captcha() {
      return <Observable<OpsResponse<any>>>this.http.get(ApiAddress.CAPTCHA, {params: {}})
    }
    //邮箱注册
    registerSendEmail(data) {
        return <Observable<OpsResponse<any>>>this.http.post(ApiAddress.REGISTER, data)
    }
    //重设密码
    resgisterPassword(data) {
        return <Observable<OpsResponse<any>>>this.http.post(ApiAddress.RESETPASSWORD, data)
    }
    //用邮箱找回密码
    forgetSendEmail(email) {
        return <Observable<OpsResponse<any>>>this.http.get(ApiAddress.RESETPASSWORD, {params: {email}})
    }
    //设置找回密码
    forgetPassword(data) {
        return <Observable<OpsResponse<any>>>this.http.put(ApiAddress.RESETPASSWORD, data)
    }

    modifyAccount(params): Observable<OpsResponse<any>> {
        return this.http.get(ApiAddress.PROFILE_EMAIL, { params }).pipe(
            map((res: OpsResponse<any>) => res)
        )
    }

    //取ssl数据
    getSslinfo(id) {
      return <Observable<OpsResponse<any>>>this.http.get(ApiAddress.SSLINFO, {params:{id}})
    }

    getSslAll() {
      return <Observable<OpsResponse<any>>>this.http.get(ApiAddress.SSLALL, {})
    }

    getSslAllinfo(page, pagesize) {
      return <Observable<OpsResponse<any>>>this.http.get(ApiAddress.SSLALLINFO, {params:{page,pagesize}})
    }

    setSslinfo(data) {
      return <Observable<OpsResponse<any>>>this.http.post(ApiAddress.SSLINFO, data)
    }

    addSslinfo(data) {
      return <Observable<OpsResponse<any>>>this.http.put(ApiAddress.SSLINFO, data)
    }

    deleteSslinfo(id) {
      return <Observable<OpsResponse<any>>>this.http.delete(ApiAddress.SSLINFO, {params:{id}})
    }

    checkerDns(dns) {
      return <Observable<OpsResponse<any>>>this.http.get(ApiAddress.DNSCHECKER, {params:{dns}})
    }
}
