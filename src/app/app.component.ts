import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PreloaderService } from '@core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  template: '<app-loading *ngIf="httpCount > 0"></app-loading><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  httpCount
  httpCountSub

  constructor(
    private preloader: PreloaderService,
    private store: Store,
    private cdf: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.httpCountSub = this.store.select(state => state.loading.reqCount)
    .subscribe(httpCount => {
        console.log("app load ... %s", httpCount )
        this.httpCount = httpCount
        this.cdf.detectChanges()
    })
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }

  ngOnDestroy() {
    this.httpCountSub.unsubscribe()
  }
}
