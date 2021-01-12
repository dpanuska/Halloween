import {
    getAppState,
    getDetectionState,
    getDetectionClearDelay,
    getActivationDelay,
    getDetectionFrequency,
    getDeactivationDelay,
    getIsAppConfigFetched,
    getAppConfigFetchStatus,
} from 'src/redux/selectors/AppSelectors';
import {RequestStates} from 'src/types/StateTypes';
import {mockAppState, mockRootState} from '../../../__mocks__/MockState';

describe('AppSelectors', () => {
    it('should get app slice of state', () => {
        expect(getAppState(mockRootState)).toEqual(mockAppState);
    });

    it('should get detection state', () => {
        expect(getDetectionState(mockRootState)).toEqual(
            mockAppState.detectionState,
        );
    });

    it('should get config detection clear delay', () => {
        expect(getDetectionClearDelay(mockRootState)).toEqual(
            mockAppState.configFetchStatus.result?.detectionClearDelay,
        );
    });

    it('should get config activation delay', () => {
        expect(getActivationDelay(mockRootState)).toEqual(
            mockAppState.configFetchStatus.result?.activationDelay,
        );
    });

    it('should get config detection frequency', () => {
        expect(getDetectionFrequency(mockRootState)).toEqual(
            mockAppState.configFetchStatus.result?.detectionFrequency,
        );
    });

    it('should get config deactivation delay', () => {
        expect(getDeactivationDelay(mockRootState)).toEqual(
            mockAppState.configFetchStatus.result?.deactivationDelay,
        );
    });

    it('should get config fetch status', () => {
        expect(getAppConfigFetchStatus(mockRootState)).toEqual(
            mockAppState.configFetchStatus,
        );
    });

    it('should get if config has been fetched', () => {
        expect(getIsAppConfigFetched(mockRootState)).toEqual(
            mockAppState.configFetchStatus.status === RequestStates.SUCCESSFUL,
        );
    });
});
