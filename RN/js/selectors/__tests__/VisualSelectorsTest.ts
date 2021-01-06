import {
    getVisualState,
    getBackgroundFile,
    getText,
    getBackgroundResource,
} from '../VisualSelectors';
import {mockVisualState, mockRootState} from '../../__mocks__/MockState';

describe('VisualSelectors', () => {
    it('should get visual slice of state', () => {
        expect(getVisualState(mockRootState)).toEqual(mockVisualState);
    });

    it('should get background file', () => {
        expect(getBackgroundFile(mockRootState)).toEqual(
            mockVisualState.backgroundFile,
        );
    });

    it('should get text', () => {
        expect(getText(mockRootState)).toEqual(mockVisualState.text);
    });
});
