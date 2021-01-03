import {
    APP_SET_DETECTION_STATE,
    CAMERA_SET_TRACKING_OBJECT,
} from '../constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {AppState, DetectionStates} from '../types/StateTypes';
import {DetectionStateAction} from '../types/AppActionTypes';
import {SetTrackingObjectAction} from '../types/CameraActionTypes';

const initialState: AppState = {
    detectionState: DetectionStates.IDLE,
    config: {
        activationDelay: 500,
        deactivationDelay: 2000,
        detectionFrequency: 100,
        detectionClearDelay: 250,
    },
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
