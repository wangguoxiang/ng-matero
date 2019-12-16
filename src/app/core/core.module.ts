import { environment } from './../../environments/environment';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AllStates } from './states/index';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { requestInterceptor } from './interceptors/request.interceptor';
import { responseInterceptor } from './interceptors/response.interceptor';
import { DefaultInterceptor } from './interceptors/default.interceptor';
import { CoreServices } from './services';

const isDev = !environment.production
const modules = [
    HttpClientModule,
    NgxsModule.forRoot(AllStates, { developmentMode: isDev }),
]

if (isDev) {
    modules.push(NgxsLoggerPluginModule.forRoot())
}

// @NgModule({
//   declarations: [],
//   imports: [CommonModule],
// })

@NgModule({
    imports: [
      CommonModule,
      ...modules
    ],
    providers: [
        DefaultInterceptor,
        ...CoreServices,
    ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
