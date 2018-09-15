import { Action } from '@ngrx/store';
import { Host } from '../../shared/models/host.model';
import { AuthData } from '../auth-data.model';
import { UserRolesEnum } from '../userRolesEnum';

export const TRY_SIGNUP = '[AUTH] Try Signup';
export const TRY_SIGNUP_SUCCESS = '[AUT] Try Signup Success';
export const TRY_SIGNIN = '[AUTH] Try Signin';
export const TRY_SIGNIN_SUCCESS = '[AUTH] Try Signin Success';
export const SIGN_OUT = '[AUTH] Signout';
export const SIGN_OUT_COMPLETE = '[AUTH] Signout Complete';
export const SET_AUTHENTICATED = '[AUTH] Set Authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] Set Unauthenticated';
export const ROLE_UPDATE = '[AUTH] Role Update';
export const AUTH_ERROR = '[AUTH] Error';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {authData: AuthData, host: Host}) {}
}

export class TrySignupSuccess implements Action {
  readonly type = TRY_SIGNUP_SUCCESS;
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {authData: AuthData}) {}
}

export class TrySigninSuccess implements Action {
  readonly type = TRY_SIGNIN_SUCCESS;
}

export class Signout implements Action {
  readonly type = SIGN_OUT;
}

export class SignoutComplete implements Action {
  readonly type = SIGN_OUT_COMPLETE;
}

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class RoleUpdate implements Action {
  readonly type = ROLE_UPDATE;
  constructor(public payload: { userRole: UserRolesEnum }) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload: { code, message }) {}
}

export type AuthActions = TrySignup | TrySignin | SetAuthenticated | SetUnauthenticated | RoleUpdate | AuthError;
