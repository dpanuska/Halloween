import {APP_SET_DETECTION_STATE} from '../constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {AppState, DetectionStates} from '../types/StateTypes';
import {DetectionStateAction} from '../types/AppActionTypes';

const initialState: AppState = {
    detectionState: DetectionStates.IDLE,
};

function setDetectionState(
    state: AppState,
    action: DetectionStateAction,
): AppState {
    let {detectionState} = action.payload;
    return {
        ...state,
        detectionState,
    };
}

const reducer = createReducer(initialState, {
    [APP_SET_DETECTION_STATE]: (
        state: AppState,
        action: DetectionStateAction,
    ) => setDetectionState(state, action),
});

export default reducer;
