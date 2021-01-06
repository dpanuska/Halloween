import {APP_SET_DETECTION_STATE, APP_INITIALIZE_SERVICES, APP_SET_CONFIGURATION} from '../../constants/Actions';
import {setDetectionState, setConfiguration, inializeServices} from '../AppActions';
import {AppConfig, DetectionStates} from '../../types/StateTypes';

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

    it('should create an action to initialize services', () => {
        let expectedAction = {
            type: APP_INITIALIZE_SERVICES,
        };
        expect(inializeServices()).toEqual(expectedAction);
    });

    it('should create an action to set configuration', () => {
        let mockConfig: AppConfig = {
            detectionFrequency: 1,
            deactivationDelay: 1,
            activationDelay: 1,
            detectionClearDelay: 1,
            activeIdleEventType: 'TYPE',
            activationEventType: 'TYPE',
            idleEventType: 'TYPE',
            deactivationEventType: 'TYPE',
        };
        let expectedAction = {
            type: APP_SET_CONFIGURATION,
            payload: mockConfig,
        };
        expect(setConfiguration(mockConfig)).toEqual(expectedAction);
    });
});
