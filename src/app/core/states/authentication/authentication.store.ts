import { Action, State, StateContext, Store } from '@ngxs/store'
import { ResetState } from '../session/session.actions'

export class SetAuthorizeStatus {
    static readonly type = '[Authentication] set authenticated'

    constructor() {}
}

export class Logout {
    static readonly type = '[Authentication] logout'
    constructor() {}
}

export interface AuthenticationModel {
    authenticated: boolean
}

@State<AuthenticationModel>({
    name: 'authentication',
    defaults: {
        authenticated: false,
    }
})
export class AuthenticationState {
    constructor(
        private store: Store,
    ) {}

    @Action(SetAuthorizeStatus)
    setLabels(ctx: StateContext<AuthenticationModel>) {
        const state = ctx.getState()
        ctx.setState({
            ...state,
            authenticated: true
        })
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthenticationModel>) {
        const state = ctx.getState()
        this.store.dispatch(new ResetState())
        ctx.setState({
            ...state,
            authenticated: false
        })
    }
}
