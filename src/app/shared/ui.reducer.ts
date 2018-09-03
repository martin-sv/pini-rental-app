import { UIActions, START_LOADNG, STOP_LOADNG } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state: State = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADNG:
      return { isLoading: true };
    case STOP_LOADNG:
      return { isLoading: false };
    default: return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
