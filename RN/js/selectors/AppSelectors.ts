import {RootState, AppState, DetectionStates} from '../types/StateTypes';

export const getAppState = (state: RootState): AppState => state.app;

export const getDetectionState = (state: RootState): DetectionStates =>
    getAppState(state).detectionState;
