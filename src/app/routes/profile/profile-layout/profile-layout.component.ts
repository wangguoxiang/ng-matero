import { Component, OnInit } from '@angular/core';
import { Profile } from './../../../core/states/profile/profile.model';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
})
export class ProfileLayoutComponent implements OnInit {
  profile: Profile
  constructor( private store: Store){
  }

  ngOnInit() {
    this.store.select(state => state.session.profile).subscribe(
      (res: Profile) => {
        this.profile = res;
      }
    );
  }
}
