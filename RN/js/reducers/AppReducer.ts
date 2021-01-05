import {APP_SET_DETECTION_STATE, APP_SET_CONFIGURATION} from '../constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {AppState, DetectionStates} from '../types/StateTypes';
import {DetectionStateAction, SetConfigAction} from '../types/AppActionTypes';

const initialState: AppState = {
    detectionState: DetectionStates.IDLE,
    config: {
        activationDelay: 500,
        deactivationDelay: 2000,
        detectionFrequency: 100,
        detectionClearDelay: 250,
        activationEventType: 'GREETING',
        deactivationEventType: 'GOODBYE',
        idleEventType: 'IDLE',
        activeIdleEventType: 'ACTIVE_IDLE',
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

function setConfiguration(state: AppState, action: SetConfigAction): AppState {
    let config = action.payload;
    return {
        ...state,
        config,
    };
}

const reducer = createReducer(initialState, {
    [APP_SET_DETECTION_STATE]: (
        state: AppState,
        action: DetectionStateAction,
    ) => setDetectionState(state, action),
    [APP_SET_CONFIGURATION]: (state: AppState, action: SetConfigAction) =>
        setConfiguration(state, action),
});

export default reducer;
