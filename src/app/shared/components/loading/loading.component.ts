import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-loading',
  template: `<div class="loading-container"><div class="loader"></div></div>`,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log("loading...")
  }

}
