import appReducer from '../AppReducer';
import {APP_SET_CONFIGURATION, APP_SET_DETECTION_STATE} from '../../constants/Actions';
import {AppState, DetectionStates} from '../../types/StateTypes';

let initialState: AppState = {
    detectionState: DetectionStates.IDLE,
    config: {
        detectionFrequency: 1,
        deactivationDelay: 1,
        activationDelay: 1,
        detectionClearDelay: 1,
        activeIdleEventType: 'TYPE',
        activationEventType: 'TYPE',
        idleEventType: 'TYPE',
        deactivationEventType: 'TYPE',
    },
};

describe('AppReducer', () => {
    it('should return initial state', () => {
        expect(appReducer(initialState, {type: 'INVALID'})).toEqual(
            initialState,
        );
    });

    it('should handle APP_SET_DETECTION_STATE', () => {
        let mockState = {
            ...initialState,
            detectionState: DetectionStates.IDLE,
        };
        let action = {
            type: APP_SET_DETECTION_STATE,
            payload: {
                detectionState: DetectionStates.ACTIVE,
            },
        };
        let expectedState = {
            ...initialState,
            detectionState: DetectionStates.ACTIVE,
        };
        expect(appReducer(mockState, action)).toEqual(expectedState);
    });

    it('should handle APP_SET_CONFIGURATION', () => {
        let mockConfig = {
            ...initialState.config,
            detectionFrequency: 1000,
        }
        let action = {
            type: APP_SET_CONFIGURATION,
            payload: mockConfig,
        };
        let expectedState = {
            ...initialState,
            config: mockConfig,
        };
        expect(appReducer(initialState, action)).toEqual(expectedState);
    });
});
