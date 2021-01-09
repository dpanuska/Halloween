import {
    APP_SET_DETECTION_STATE,
    APP_FETCH_CONFIG_REQUESTED,
    APP_FETCH_CONFIG_STATUS,
} from '../constants/Actions';

import {AppConfig, DetectionStates, RequestStates} from 'types/StateTypes';
import {RequestStatusAction} from 'types/ActionTypes';
import {DetectionStateAction} from 'types/AppActionTypes';
import {Action} from '@reduxjs/toolkit';

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

export const fetchConfigStarted = (): RequestStatusAction => ({
    type: APP_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const fetchConfigFailed = (error: Error): RequestStatusAction => ({
    type: APP_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const fetchConfigSuccess = (config: AppConfig): RequestStatusAction => ({
    type: APP_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: config,
    },
});
