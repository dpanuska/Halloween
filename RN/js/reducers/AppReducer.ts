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

function handleDetectionObjectSet(
    state: AppState,
    action: SetTrackingObjectAction,
): AppState {
    let {data} = action.payload;
    let detectionState =
        data == null ? DetectionStates.IDLE : DetectionStates.ACTIVE;
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
    [CAMERA_SET_TRACKING_OBJECT]: (
        state: AppState,
        action: SetTrackingObjectAction,
    ) => handleDetectionObjectSet(state, action),
});

export default reducer;
