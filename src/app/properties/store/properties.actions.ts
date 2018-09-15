import { Action } from '@ngrx/store';
import { Property } from '../../shared/models/property.model';
import { Host } from '@angular/core';

export const SET_PROPERTIES_LIST = '[PROPERTIES] Set Properties List';
export const SET_HOST_DATA = '[PROPERTIES] Set Host Data';
export const SELECT_PROPERTY = '[PROPERTIES] Select Property';
export const UNSELECT_PROPERTY = '[PROPERTIES] UnSelect Property';
export const SELECT_CHECKIN = '[PROPERTIES] Select Scheckin';
export const UNSELECT_CHECKIN = '[PROPERTIES] UnSelect Checkin';

export class SetPropertiesList implements Action {
  readonly type = SET_PROPERTIES_LIST ;

  constructor(public payload: Property[]) {}
}

export class SetHostData implements Action {
  readonly type = SET_HOST_DATA;

  constructor(public payload: Host) {}
}

export class SelectProperty implements Action {
  readonly type = SELECT_PROPERTY;

  constructor(public payload: string) {}
}

export class UnSelectProperty implements Action {
  readonly type = UNSELECT_PROPERTY;
}

export class SelectCheckin implements Action {
  readonly type = SELECT_CHECKIN;

  constructor(public payload: string) {}
}

export class UnSelectCheckin implements Action {
  readonly type = UNSELECT_CHECKIN;
}

export type PropertiesActions = SetPropertiesList | SetHostData | SelectProperty | UnSelectProperty | SelectCheckin | UnSelectCheckin;
