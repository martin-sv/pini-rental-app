import { Action } from '@ngrx/store';
import { Condo } from '../models/condo.model';

export const SET_CONDOS_LIST = '[DATA] Set Condos List';
export const SET_PROPERTY_TYPES = '[DATA] Set Property Types';

export class SetCondosList implements Action {
  readonly type = SET_CONDOS_LIST ;

  constructor(public payload: Condo[]) {}
}

export class SetPropertyTypes implements Action {
  readonly type = SET_PROPERTY_TYPES;

  constructor(public payload: string[]) {}
}

export type DataActions = SetCondosList | SetPropertyTypes;
