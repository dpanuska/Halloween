import {APP_SET_DETECTION_STATE} from '../constants/ActionTypes';
import {createReducer} from '@reduxjs/toolkit';

import {AppState, DetectionState} from '../types/StateTypes';

const initialState: AppState = {
  detectionState: DetectionState.IDLE,
};

function setAppState(state: AppState, action): AppState {
  let {detectionState} = action.payload;
  return {
    ...state,
    detectionState,
  };
}

const reducer = createReducer(initialState, {
  [APP_SET_DETECTION_STATE]: (state: AppState, action: any) =>
    setAppState(state, action),
});

export default reducer;