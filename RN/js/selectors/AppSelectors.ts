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

export const getDetectionDelay = (state: RootState): number =>
    getConfig(state).activationDelay;

export const getEndDetectionDelay = (state: RootState): number =>
    getConfig(state).deactivationDelay;

export const getDetectionFrequency = (state: RootState): number =>
    getConfig(state).detectionFrequency;

export const getDetectionClearDelay = (state: RootState): number =>
    getConfig(state).detectionClearDelay;
