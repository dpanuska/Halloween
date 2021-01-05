import {
    APP_SET_DETECTION_STATE,
    APP_INITIALIZE_SERVICES,
    APP_SET_CONFIGURATION,
} from '../constants/Actions';
import {AppConfig, DetectionStates} from '../types/StateTypes';

import {DetectionStateAction, SetConfigAction} from '../types/AppActionTypes';
import {Action} from '@reduxjs/toolkit';

export const setDetectionState = (
    detectionState: DetectionStates,
): DetectionStateAction => ({
    type: APP_SET_DETECTION_STATE,
    payload: {
        detectionState,
    },
});

export const inializeServices = (): Action => ({
    type: APP_INITIALIZE_SERVICES,
});

export const setConfiguration = (config: AppConfig): SetConfigAction => ({
    type: APP_SET_CONFIGURATION,
    payload: {
        ...config,
    },
});
