import { Component, OnInit } from '@angular/core';
import { Profile } from './../../../core/states/profile/profile.model';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-panel',
  template: `
    <div
      class="matero-user-panel p-y-16 b-b-1"
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <img
        class="matero-user-panel-avatar m-b-8 r-full"
        src={{profile.Avatar}}
        alt="avatar"
        width="64"
      />
      <h4 class="matero-user-panel-name m-t-0 m-b-8 f-w-400">{{profile.Name}}</h4>
      <h5 class="matero-user-panel-email m-t-0 m-b-8 f-w-400">{{profile.Email}}</h5>
      <div class="matero-user-panel-icons text-nowrap">
        <a routerLink="/profile/overview" mat-icon-button>
          <mat-icon class="icon-18">account_circle</mat-icon>
        </a>
        <a routerLink="/profile/settings" mat-icon-button>
          <mat-icon class="icon-18">settings</mat-icon>
        </a>
        <a routerLink="/auth/login" mat-icon-button>
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent implements OnInit {
  profile: Profile;
  constructor( private store: Store) {}

  ngOnInit() {
    this.store.select(state => state.session.profile).subscribe(
      (res: Profile) => {
        this.profile = res;
      }
    );
  }
}
