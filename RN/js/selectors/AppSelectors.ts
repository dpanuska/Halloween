import {createSelector} from '@reduxjs/toolkit';
import {
    RootState,
    AppState,
    DetectionStates,
    AppConfig,
    RequestStates,
} from 'types/StateTypes';

export const getAppState = (state: RootState): AppState => state.app;

export const getAppConfigFetchStatus = (state: RootState): RequestStates =>
    getAppState(state).configFetchStatus;

export const getIsAppConfigFetched = createSelector(
    getAppConfigFetchStatus,
    (status) => {
        return status === RequestStates.SUCCESSFUL;
    },
);

export const getDetectionState = (state: RootState): DetectionStates =>
    getAppState(state).detectionState;

export const getConfig = (state: RootState): AppConfig =>
    getAppState(state).config;

export const getActivationDelay = (state: RootState): number =>
    getConfig(state).activationDelay;

export const getDeactivationDelay = (state: RootState): number =>
    getConfig(state).deactivationDelay;

export const getDetectionFrequency = (state: RootState): number =>
    getConfig(state).detectionFrequency;

export const getDetectionClearDelay = (state: RootState): number =>
    getConfig(state).detectionClearDelay;
