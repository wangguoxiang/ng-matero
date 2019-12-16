import { ProfileService } from './states/profile/profile.service';
import { SessionService } from './states/session/session.service';
import { AuthenticationService } from './states/authentication/authentication.service';
// import { ConfigService } from './services/config.service';
// import { TranslationService } from './services/translation.service';
 import { MessageTipService } from './services/message-tip.service';


//import { AuthService } from './services/auth.service';

export const CoreServices = [
  MessageTipService,
  AuthenticationService,
  SessionService,
  ProfileService
]
