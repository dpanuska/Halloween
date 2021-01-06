import {
    APP_SET_DETECTION_STATE,
    APP_FETCH_CONFIG_STATUS,
} from '../constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {AppState, DetectionStates, RequestStates} from '../types/StateTypes';
import {RequestStatusAction} from '../types/ActionTypes';
import {DetectionStateAction} from '../types/AppActionTypes';

const initialState: AppState = {
    detectionState: DetectionStates.IDLE,
    configFetchStatus: RequestStates.NOT_FETCHED,
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

function updateConfigFetchStatus(
    state: AppState,
    action: RequestStatusAction,
): AppState {
    let {status, result} = action.payload;
    let config = result != null ? result : state.config;
    return {
        ...state,
        config,
        configFetchStatus: status,
    };
}

const reducer = createReducer(initialState, {
    [APP_SET_DETECTION_STATE]: (
        state: AppState,
        action: DetectionStateAction,
    ) => setDetectionState(state, action),
    [APP_FETCH_CONFIG_STATUS]: (state: AppState, action: RequestStatusAction) =>
        updateConfigFetchStatus(state, action),
});

export default reducer;
