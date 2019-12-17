import { Injectable } from '@angular/core';
import {
    HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { OpsResponse } from '../settings';
import { catchError, map } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs/index';
import { Store } from '@ngxs/store';
import { RequestDone } from '../states/loading/loading.store'
import { MessageTipService } from '../services/message-tip.service';

const shuntHandler = <T>(store) => (source: Observable<T>) => new Observable<T>((subscriber) => {
    source.subscribe({
        next(value: T) {
            console.log(value);
            if (value instanceof HttpResponse) {
                const body = value.body
                if (body.status === 200) {
                    subscriber.next(value)
                } else {
                    subscriber.error(body)
                }
            }
        },
        error(err) {
            // http error
            subscriber.error({
                status: err.status,
                message: err.statusText
            })
        },
        complete() {
            subscriber.complete()
        }
    })
})

@Injectable()
export class ResponseFormatInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private store: Store,
        private msg: MessageTipService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<any>> {
        return next.handle(req).pipe(
          shuntHandler(this.store),
          map((httpResponse: HttpResponse<any>) => {
            //console.log(httpResponse);
              const body: OpsResponse<any> = httpResponse.body
              this.store.dispatch(new RequestDone());

              return httpResponse;
          }),
          catchError((err) => {
                this.store.dispatch(new RequestDone())
                if (err.status === 401) {
                    this.router.navigate(['auth/login'])
                }
                this.msg.createTips("error", err.message)
                return throwError(err)
            }),
        )
    }
}

export const responseInterceptor = [
    // response 顺序是从后往前
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseFormatInterceptor,
        multi: true
    }
]
