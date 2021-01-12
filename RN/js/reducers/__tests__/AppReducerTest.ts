import appReducer from 'src/reducers/AppReducer';
import {
    APP_SET_DETECTION_STATE,
    APP_FETCH_CONFIG_STATUS,
} from 'src/constants/Actions';
import {AppState, DetectionStates, RequestStates} from 'types/StateTypes';

let initialState: AppState = {
    detectionState: DetectionStates.IDLE,
    configFetchStatus: {
        status: RequestStates.SUCCESSFUL,
        result: {
            detectionFrequency: 1,
            deactivationDelay: 1,
            activationDelay: 1,
            detectionClearDelay: 1,
        },
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

    describe('APP_FETCH_CONFIG_STATUS', () => {
        it('should handle started', () => {
            let action = {
                type: APP_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                configFetchStatus: {
                    status: RequestStates.STARTED,
                    result: undefined,
                },
            };
            expect(appReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle success', () => {
            let mockConfig = {
                ...initialState.configFetchStatus,
                result: {
                    ...initialState.configFetchStatus.result,
                    detectionClearDelay: 10000,
                },
            };
            let action = {
                type: APP_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockConfig,
                },
            };
            let expectedState = {
                ...initialState,
                configFetchStatus: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockConfig,
                },
            };
            expect(appReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle failure', () => {
            let error = new Error('some error');
            let action = {
                type: APP_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                configFetchStatus: {
                    status: RequestStates.FAILED,
                    error,
                    result: undefined,
                },
            };
            expect(appReducer(initialState, action)).toEqual(expectedState);
        });
    });
});
