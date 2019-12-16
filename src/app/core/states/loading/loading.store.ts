import { Action, State, StateContext } from '@ngxs/store'

export class AddRequest {
    static readonly type = '[loading] request emit'

    constructor() {}
}

export class RequestDone {
    static readonly type = '[loading] response done'

    constructor() {}
}

export interface LoadingStore {
    reqCount: number
}

@State<LoadingStore>({
    name: 'loading',
    defaults: {
        reqCount: 0
    }
})
export class LoadingState {
    @Action(AddRequest)
    addRequest(ctx: StateContext<LoadingStore>) {
        const state = ctx.getState();
        console.log("Acount:", state);
        ctx.setState({
            reqCount: state.reqCount + 1
        })
    }

    @Action(RequestDone)
    requestDone(ctx: StateContext<LoadingStore>) {
        const state = ctx.getState();
        const value = state.reqCount;
        console.log("Rcount:", state);
        ctx.setState({
            reqCount: value > 0 ? value - 1 : 0
        })
    }
}
