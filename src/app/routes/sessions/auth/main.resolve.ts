import { Injectable } from '@angular/core';
import { ProfileService } from './../../../core/states/profile/profile.service';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/internal/operators';
import { Store } from '@ngxs/store';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './../../../core/states/session/session.service';
import { MessageTipService } from './../../../core/services/message-tip.service';


@Injectable()
export class MainResolveService implements CanActivate, CanActivateChild {

    constructor(
        private profileService: ProfileService,
        private store: Store,
        private sessionService: SessionService,
        private messageService: MessageTipService,
        private router: Router,
    ) {}

    canActivate() {
        const profile$ = this.profileService.loadProfile()
        console.log(profile$);
        return forkJoin(profile$).pipe(
            take(1),
            tap((profile) => {
              console.log(profile);
              return profile;
            }),
            map(() => true),
            catchError((error) => {
              this.messageService.createTips("error", error);
                return of(false);
            })
        )
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const routerData = childRoute.data
        const permissions = routerData.permissions
        if (!permissions) {
            return true
        }

        const isAuth = this.sessionService.hasPermission(permissions)

        if (!isAuth) {
            this.messageService.createTips("error","Access is limited. If you want to access, please reassign your permission.")
            this.router.navigate(['/auth/login'])
        }

        return isAuth
    }
}
