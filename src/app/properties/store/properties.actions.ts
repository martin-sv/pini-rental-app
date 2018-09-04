import { Action } from '@ngrx/store';
import { Property } from '../../shared/models/property.model';
import { Host } from '@angular/core';

export const SET_PROPERTIES_LIST = '[Properties] Set Properties List';
export const SET_HOSTS_LIST = '[Properties] Set Hosts';
// export const START_EDIT

export class SetPropertiesList implements Action {
  readonly type = SET_PROPERTIES_LIST ;

  constructor(public payload: Property[]) {}
}

export class SetHostData implements Action {
  readonly type = SET_HOSTS_LIST;

  constructor(public payload: Host) {}
}

export type PropertiesActions = SetPropertiesList | SetHostData;
