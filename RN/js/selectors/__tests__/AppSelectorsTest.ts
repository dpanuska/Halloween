import {
    getAppState,
    getDetectionState,
    getConfig,
    getDetectionClearDelay,
    getActivationDelay,
    getDetectionFrequency,
    getDeactivationDelay,
    getActivationEventType,
    getDeactivationEventType,
    getIdleEventType,
    getActiveIdleEventType,
} from '../AppSelectors';
import {mockAppState, mockRootState} from '../../__mocks__/MockState';

describe('AppSelectors', () => {
    it('should get app slice of state', () => {
        expect(getAppState(mockRootState)).toEqual(mockAppState);
    });

    it('should get detection state', () => {
        expect(getDetectionState(mockRootState)).toEqual(
            mockAppState.detectionState,
        );
    });

    it('should get configuration', () => {
        expect(getConfig(mockRootState)).toEqual(mockAppState.config);
    });

    it('should get config detection clear delay', () => {
        expect(getDetectionClearDelay(mockRootState)).toEqual(
            mockAppState.config.detectionClearDelay,
        );
    });

    it('should get config activation delay', () => {
        expect(getActivationDelay(mockRootState)).toEqual(
            mockAppState.config.activationDelay,
        );
    });

    it('should get config detection frequency', () => {
        expect(getDetectionFrequency(mockRootState)).toEqual(
            mockAppState.config.detectionFrequency,
        );
    });

    it('should get config deactivation delay', () => {
        expect(getDeactivationDelay(mockRootState)).toEqual(
            mockAppState.config.deactivationDelay,
        );
    });

    it('should get config activation event type', () => {
        expect(getActivationEventType(mockRootState)).toEqual(
            mockAppState.config.activationEventType,
        );
    });

    it('should get config deactivation event type', () => {
        expect(getDeactivationEventType(mockRootState)).toEqual(
            mockAppState.config.deactivationEventType,
        );
    });

    it('should get config idle event type', () => {
        expect(getIdleEventType(mockRootState)).toEqual(
            mockAppState.config.idleEventType,
        );
    });

    it('should get config active-idle event type', () => {
        expect(getActiveIdleEventType(mockRootState)).toEqual(
            mockAppState.config.activeIdleEventType,
        );
    });
});
