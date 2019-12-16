import { SessionState } from './session/session.store'
import { LoadingState } from './loading/loading.store'
import { AuthenticationState } from './authentication/authentication.store'


export const AllStates = [
  LoadingState,
  SessionState,
  AuthenticationState,
]
