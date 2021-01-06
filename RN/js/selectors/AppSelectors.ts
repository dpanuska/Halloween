import {
    RootState,
    AppState,
    DetectionStates,
    AppConfig,
} from '../types/StateTypes';

export const getAppState = (state: RootState): AppState => state.app;

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

export const getActivationEventType = (state: RootState): string =>
    getConfig(state).activationEventType;

export const getDeactivationEventType = (state: RootState): string =>
    getConfig(state).deactivationEventType;

export const getIdleEventType = (state: RootState): string =>
    getConfig(state).idleEventType;

export const getActiveIdleEventType = (state: RootState): string =>
    getConfig(state).activeIdleEventType;
