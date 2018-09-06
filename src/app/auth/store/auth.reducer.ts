import * as AuthActions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  isUnAuthenticated: boolean;
  authError: { code, message };
}

const initialState: State = {
  isAuthenticated: false,
  isUnAuthenticated: true,
  authError: { code: '', message: ''}
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true, isUnAuthenticated: false };
    case AuthActions.SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false, isUnAuthenticated: true };
    case AuthActions.AUTH_ERROR:
      return { ...state, authError: action.payload };
    default: return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getIsUnAuth = (state: State) => state.isUnAuthenticated;
export const onAuthError = (state: State) => state.authError;
