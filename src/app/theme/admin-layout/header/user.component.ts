import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../../core/states/profile/profile.service';
import { Profile } from './../../../core/states/profile/profile.model';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-user',
  template: `
    <a mat-button href="javascript:void(0)" [matMenuTriggerFor]="menu">
      <img
        class="matero-user-avatar r-full align-middle"
        src={{profile.Avatar}}
        width="24"
        alt="avatar"
      />
      <span class="align-middle">{{profile.Name}}</span>
    </a>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Profile</span>
      </a>
      <a routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
      <a routerLink="/auth/login" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit  {
  profile: Profile;

  constructor( private store: Store) {}

  ngOnInit() {
    // this.store.select(state => state.session.setProfile).pipe(
    //   map((profile: Profile) => {console.log(profile); return profile;})
    //  )
    // .subscribe( res =>{
    //   console.log(res);
    //   this.profile = res;
    //  });
      this.store.select(state => state.session.profile).subscribe(
       (res: Profile) => {
         this.profile = res;
       }
     );

    // this.profiles.loadProfile().subscribe(
    //   (res) => {
    //     this.profile = res;
    //     console.log(this.profile);
    //   }
    // );
  }
}
