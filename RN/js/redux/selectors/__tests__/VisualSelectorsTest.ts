import {
    getVisualState,
    getBackgroundResource,
    getText,
    getBackgroundImageBase64,
} from 'src/redux/selectors/VisualSelectors';
import {mockVisualState, mockRootState} from '../../../__mocks__/MockState';

describe('VisualSelectors', () => {
    it('should get visual slice of state', () => {
        expect(getVisualState(mockRootState)).toEqual(mockVisualState);
    });

    it('should get background resource', () => {
        expect(getBackgroundResource(mockRootState)).toEqual(
            mockVisualState.backgroundResource,
        );
    });

    it('should get background image base64', () => {
        expect(getBackgroundImageBase64(mockRootState)).toEqual(
            mockVisualState.backgroundImage?.base64,
        );
    });

    it('should get text', () => {
        expect(getText(mockRootState)).toEqual(mockVisualState.text);
    });
});
