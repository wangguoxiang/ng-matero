import { State, Action, StateContext, Store } from '@ngxs/store'
import { Profile } from '../profile/profile.model'
import { SetProfile, ChangeProfile, ResetState, SetStoreStates } from './session.actions'

export interface Session {
    profile: Profile,
    reportStates: string[]
}

const initSessionState: Session = {
  profile: null,
  reportStates: []
}

@State<Session>({
  name: 'session',
  defaults: initSessionState
})

export class SessionState {
  constructor(
      private store: Store
  ) {
  }

  @Action(SetProfile)
  setProfile(ctx: StateContext<Session>, action: SetProfile) {
      const state = ctx.getState()
      ctx.setState({
          ...state,
          profile: action.payload
      })
  }

  @Action(ChangeProfile)
  changeProfile(ctx: StateContext<Session>, action: ChangeProfile) {
      const state = ctx.getState()
      ctx.setState({
          ...state,
          profile: {...state.profile, ...action.payload}
      })
  }

  @Action(ResetState)
  resetState(ctx: StateContext<Session>) {
      ctx.setState({
          ...initSessionState
      })
  }

  @Action(SetStoreStates)
  setStoreStates(ctx: StateContext<Session>, action: SetStoreStates) {
      const state = ctx.getState()
      ctx.setState({
          ...state,
          reportStates: action.payload
      })
  }

  // private privilegeToPermission(privileges): string[] {
  //     const perArr = []
  //     Object.entries(privileges).forEach(([key, value]) => {
  //         if (value) {
  //             perArr.push(permissionsDict[key])
  //         }
  //     })

  //     return perArr
  // }
}
