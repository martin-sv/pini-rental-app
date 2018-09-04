import * as AuthActions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  authError: { code, message };
}

const initialState: State = {
  isAuthenticated: false,
  authError: { code: '', message: ''}
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case AuthActions.SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    case AuthActions.AUTH_ERROR:
      return { ...state, authError: action.payload };
    default: return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const onAuthError = (state: State) => state.authError;
