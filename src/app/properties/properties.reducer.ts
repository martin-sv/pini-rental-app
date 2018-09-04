import { Property } from '../shared/models/property.model';
import { Host } from '../shared/models/host.model';
import * as fromRoot from '../app.reducer';
import { PropertiesActions, SET_PROPERTIES_LIST, SET_HOSTS_LIST } from './properties.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PropertiesState {
  propertiesList: Property[];
  hostData: Host;
}

export interface State extends fromRoot.State {
  properties: PropertiesState;
}

const initialState: PropertiesState = {
  propertiesList: [],
  hostData: null
};

export function propertiesReducer(state: PropertiesState = initialState, action: PropertiesActions) {
  switch (action.type) {
    case SET_PROPERTIES_LIST:
      return {
        ...state,
        propertiesList: action.payload };  // Append to the current state. To avoid overwriting.
    case SET_HOSTS_LIST:
      return {
        ...state,
        hostData: action.payload };
    default: return state;
  }
}

export const getPropertiesState = createFeatureSelector<PropertiesState>('properties');

export const getPropertiesList = createSelector(getPropertiesState, (state: PropertiesState) => state.propertiesList);
export const getHostData = createSelector(getPropertiesState, (state: PropertiesState) => state.hostData);
