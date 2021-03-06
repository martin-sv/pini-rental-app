import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromData from './shared/deprecated/data.reducer';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
  data: fromData.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  data: fromData.dataReducer
};

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getIsUnAuth = createSelector(getAuthState, fromAuth.getIsUnAuth);
export const onAuthError = createSelector(getAuthState, fromAuth.onAuthError);
