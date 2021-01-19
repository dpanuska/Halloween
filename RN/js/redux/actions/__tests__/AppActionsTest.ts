import {
    APP_SET_DETECTION_STATE,
    APP_FETCH_CONFIG_REQUESTED,
    APP_FETCH_CONFIG_STATUS,
} from 'src/constants/Actions';
import {
    setDetectionState,
    fetchAppConfig,
    fetchConfigStarted,
    fetchConfigSuccess,
    fetchConfigFailed,
} from 'src/redux/actions/AppActions';
import {AppConfig, DetectionStates, RequestStates} from 'types/StateTypes';

describe('AppActions', () => {
    it('should create an action to set detection state', () => {
        let detectionState = DetectionStates.ACTIVE;
        let expectedAction = {
            type: APP_SET_DETECTION_STATE,
            payload: {
                detectionState,
            },
        };
        expect(setDetectionState(detectionState)).toEqual(expectedAction);
    });

    it('should create an action to request fetch config', () => {
        let expectedAction = {
            type: APP_FETCH_CONFIG_REQUESTED,
        };
        expect(fetchAppConfig()).toEqual(expectedAction);
    });

    it('should create an action for fetch config started', () => {
        let expectedAction = {
            type: APP_FETCH_CONFIG_STATUS,
            payload: {
                status: RequestStates.STARTED,
            },
        };
        expect(fetchConfigStarted()).toEqual(expectedAction);
    });

    it('should create an action for fetch config success', () => {
        let mockConfig: AppConfig = {
            deactivationDelay: 1,
            detectionClearDelay: 1,
            activationDelay: 1,
            detectionFrequency: 1,
            activeIdleDelay: 1,
            imageQuality: 1,
        };
        let expectedAction = {
            type: APP_FETCH_CONFIG_STATUS,
            payload: {
                status: RequestStates.SUCCESSFUL,
                result: mockConfig,
            },
        };
        expect(fetchConfigSuccess(mockConfig)).toEqual(expectedAction);
    });

    it('should create an action for fetch config fail', () => {
        let error = new Error('some error');
        let expectedAction = {
            type: APP_FETCH_CONFIG_STATUS,
            payload: {
                status: RequestStates.FAILED,
                error,
            },
        };
        expect(fetchConfigFailed(error)).toEqual(expectedAction);
    });
});
