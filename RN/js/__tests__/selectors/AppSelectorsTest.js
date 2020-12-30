import {getAppState, getDetectionState} from '../../selectors/AppSelectors';
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
});
