import {createSelector} from '@reduxjs/toolkit';
import {
    RootState,
    AppState,
    DetectionStates,
    AppConfig,
    RequestStates,
    RequestActionStatus,
} from 'types/StateTypes';

export const getAppState = (state: RootState): AppState => state.app;

export const getAppConfigFetchStatus = (
    state: RootState,
): RequestActionStatus<void, AppConfig> => getAppState(state).configFetchStatus;

export const getIsAppConfigFetched = createSelector(
    getAppConfigFetchStatus,
    (config) => {
        return config.status === RequestStates.SUCCESSFUL;
    },
);

export const getDetectionState = (state: RootState): DetectionStates =>
    getAppState(state).detectionState;

export const getActivationDelay = createSelector(
    getAppConfigFetchStatus,
    (config) => {
        return config.result?.activationDelay;
    },
);

export const getDeactivationDelay = createSelector(
    getAppConfigFetchStatus,
    (config) => {
        return config.result?.deactivationDelay;
    },
);
export const getDetectionFrequency = createSelector(
    getAppConfigFetchStatus,
    (config) => {
        return config.result?.detectionFrequency;
    },
);
export const getDetectionClearDelay = createSelector(
    getAppConfigFetchStatus,
    (config) => {
        return config.result?.detectionClearDelay;
    },
);
