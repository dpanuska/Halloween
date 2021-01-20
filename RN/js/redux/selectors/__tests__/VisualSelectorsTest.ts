import {
    getVisualState,
    getBackgroundResource,
    getText,
} from 'src/redux/selectors/VisualSelectors';
import {mockVisualState, mockRootState} from '../../../__mocks__/MockState';

describe('VisualSelectors', () => {
    it('should get visual slice of state', () => {
        expect(getVisualState(mockRootState)).toEqual(mockVisualState);
    });

    it('should get background file', () => {
        expect(getBackgroundResource(mockRootState)).toEqual(
            mockVisualState.backgroundResource,
        );
    });

    it('should get text', () => {
        expect(getText(mockRootState)).toEqual(mockVisualState.text);
    });
});
