import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[AUTH] Set Authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] Set Unauthenticated';
export const AUTH_ERROR = '[AUTH] Error';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED ;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public payload: { code, message }) {}
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | AuthError;
