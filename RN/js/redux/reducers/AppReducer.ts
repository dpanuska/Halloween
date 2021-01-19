import {
    APP_SET_DETECTION_STATE,
    APP_FETCH_CONFIG_STATUS,
} from 'src/constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {AppState, DetectionStates, RequestStates} from 'types/StateTypes';
import {
    DetectionStateAction,
    FetchConfigRequestStatusAction,
} from 'types/AppActionTypes';

const initialState: AppState = {
    detectionState: DetectionStates.IDLE,
    configFetchStatus: {
        status: RequestStates.NOT_STARTED,
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
    action: FetchConfigRequestStatusAction,
): AppState {
    return {
        ...state,
        configFetchStatus: action.payload,
    };
}

const reducer = createReducer(initialState, {
    [APP_SET_DETECTION_STATE]: (
        state: AppState,
        action: DetectionStateAction,
    ) => setDetectionState(state, action),
    [APP_FETCH_CONFIG_STATUS]: (
        state: AppState,
        action: FetchConfigRequestStatusAction,
    ) => updateConfigFetchStatus(state, action),
});

export default reducer;
