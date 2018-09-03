import { Action } from '@ngrx/store';

export const START_LOADNG = '[UI] START LOADING';
export const STOP_LOADNG = '[UI] STOP LOADING';

export class StartLoading implements Action {
  readonly type = START_LOADNG;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADNG;
}

export type UIActions = StartLoading | StopLoading;
