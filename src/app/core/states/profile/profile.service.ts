import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiAddress, ApiV2Address } from '../../web.api';
import { map, tap } from 'rxjs/internal/operators';
import { OpsResponse } from './../../settings';
import { PasswordUpdater, Profile } from './profile.model';
import { Store } from '@ngxs/store';
import { SetProfile, ChangeProfile } from '../session/session.actions';

@Injectable()
export class ProfileService {

    constructor(
        private http: HttpClient,
        private store: Store,
    ) {}

    loadProfile() {
        return this.http.get(ApiAddress.PROFILE).pipe(
            map((res: OpsResponse<Profile>) => res.meta),
            tap(profile => {
                 console.log(profile);
                this.store.dispatch(new SetProfile(profile))
            })
        )
    }

    saveProfile(profile) {
        return this.http.put(ApiV2Address.PROFILE, profile).pipe(
            map((res: OpsResponse<Profile>) => res.meta),
            tap(profile => {
              this.store.dispatch(new ChangeProfile(profile))
            })
        )
    }

    changePassword(updater: PasswordUpdater) {
        return this.http.put(ApiAddress.PASSWORD, updater).pipe(
            map((res: OpsResponse<any>) => res.meta),
        )
    }

    editEmail(value) {
        return this.http.put(ApiAddress.PROFILE_EMAIL, value).pipe(
            map((res: OpsResponse<any>) => res),
        )
    }
}
