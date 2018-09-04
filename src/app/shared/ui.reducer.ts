import * as UIActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state: State = initialState, action: UIActions.UIActions) {
  switch (action.type) {
    case UIActions.START_LOADNG:
      return { isLoading: true };
    case UIActions.STOP_LOADNG:
      return { isLoading: false };
    default: return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
