import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,  HttpErrorResponse, } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/internal/Observable';
import { AddRequest } from '../states/loading/loading.store';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

const REST_PARAMS = /(:[^/]+)/g;

@Injectable()
export class RequestRestInterceptor implements HttpInterceptor {
    constructor(
        private store: Store,
        private messageService: NzMessageService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let realReq = request
      //const matched = request.url.match(REST_PARAMS)
      console.log(realReq);
      if (realReq.params.get('isLoading')) {
          realReq = realReq.clone({
              params: realReq.params.delete('isLoading'),
          })
      }

      if (realReq.params.get('isLoading') !== 'false') {
           this.store.dispatch(new AddRequest())
      }
      return next.handle(request);
    }
}

export const requestInterceptor = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestRestInterceptor,
        multi: true
    }
]
