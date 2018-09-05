import { Action } from '@ngrx/store';
import { Host } from '../../shared/models/host.model';
import { AuthData } from '../auth-data.model';

export const TRY_SIGNUP = '[AUTH] Try Signup';
export const SET_AUTHENTICATED = '[AUTH] Set Authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] Set Unauthenticated';
export const AUTH_ERROR = '[AUTH] Error';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {authData: AuthData, host: Host}) {}
}

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public payload: { code, message }) {}
}

export type AuthActions = TrySignup | SetAuthenticated | SetUnauthenticated | AuthError;
