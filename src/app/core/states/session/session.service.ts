import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { isArray } from 'util'

@Injectable()
export class SessionService {

    constructor(
        private http: HttpClient,
        private store: Store,
    ) {}

    hasPermission(needs: string[]): boolean {
      const permissions = this.store.selectSnapshot(state => state.session.permissions)
      let isAuth = true
      if (isArray(needs)) {
          const tempArr = []
          needs.forEach((item) => {
              const target = permissions.find((pItem) => pItem === item)
              if (target) { tempArr.push(target) }
          })
          isAuth = tempArr.length === needs.length

          return isAuth

      } else {
          throw Error('Input data should be array')
      }
  }
}
