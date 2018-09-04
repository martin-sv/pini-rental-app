import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, AUTH_ERROR } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  authError: { code, message };
}

const initialState: State = {
  isAuthenticated: false,
  authError: { code: '', message: ''}
};

export function authReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    default: return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const onAuthError = (state: State) => state.authError;
