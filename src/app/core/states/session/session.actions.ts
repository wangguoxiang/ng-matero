import { Profile } from '../profile/profile.model'

export class SetProfile {
  static readonly type = '[Session] set profile'

  constructor(public payload: Profile) {
  }
}

export class ChangeProfile {
  static readonly type = '[Session] change profile'

  constructor(public payload: Profile) {
  }
}

export class ResetState {
  static readonly type = '[Session] logout and reset all state'

  constructor() {
  }
}

export class SetStoreStates {
  static readonly type = '[Session] set report state'

  constructor(public payload: string[]) {
  }
}
