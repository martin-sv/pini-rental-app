import { DataActions, SET_CONDOS_LIST, SET_PROPERTY_TYPES } from './data.actions';
import { Condo } from './models/condo.model';

export interface State {
  condosList: Condo[];
  propertyTypes: string[];
}

const initialState: State = {
  condosList: [],
  propertyTypes: []
};

export function dataReducer(state: State = initialState, action: DataActions) {
  switch (action.type) {
    case SET_CONDOS_LIST:
      return { ...state, condosList: action.payload };
    case SET_PROPERTY_TYPES:
      return { ...state, propertyTypes: action.payload };
    default: return state;
  }
}

export const getCondosList = (state: State) => state.condosList;
export const getPropertyTypes = (state: State) => state.propertyTypes;
