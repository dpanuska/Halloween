import {
    APP_SET_DETECTION_STATE,
    APP_FETCH_CONFIG_REQUESTED,
    APP_FETCH_CONFIG_STATUS,
} from 'src/constants/Actions';

import {AppConfig, DetectionStates, RequestStates} from 'types/StateTypes';
import {
    DetectionStateAction,
    FetchConfigRequestStatusAction,
} from 'types/AppActionTypes';
import {Action} from 'redux';

export const setDetectionState = (
    detectionState: DetectionStates,
): DetectionStateAction => ({
    type: APP_SET_DETECTION_STATE,
    payload: {
        detectionState,
    },
});

export const fetchAppConfig = (): Action => ({
    type: APP_FETCH_CONFIG_REQUESTED,
});

export const fetchConfigStarted = (): FetchConfigRequestStatusAction => ({
    type: APP_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const fetchConfigFailed = (
    error: Error,
): FetchConfigRequestStatusAction => ({
    type: APP_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const fetchConfigSuccess = (
    config: AppConfig,
): FetchConfigRequestStatusAction => ({
    type: APP_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: config,
    },
});
