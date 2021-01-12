import {
    getSpeechState,
    getIsSpeaking,
    getIsSettingRate,
    getIsSettingPitch,
    getIsSettingLocale,
} from 'src/redux/selectors/TTSSelectors';
import {mockSpeechState, mockRootState} from '../../../__mocks__/MockState';

describe('TTSSelectors', () => {
    it('should get speech slice of state', () => {
        expect(getSpeechState(mockRootState)).toEqual(mockSpeechState);
    });

    it('should get isSpeaking', () => {
        expect(getIsSpeaking(mockRootState)).toEqual(
            mockSpeechState.isSpeaking,
        );
    });

    it('should get isSettingRate', () => {
        expect(getIsSettingRate(mockRootState)).toEqual(
            mockSpeechState.isSettingRate,
        );
    });

    it('should get isSettingPitch', () => {
        expect(getIsSettingPitch(mockRootState)).toEqual(
            mockSpeechState.isSettingPitch,
        );
    });

    it('should get isSettingLocale', () => {
        expect(getIsSettingLocale(mockRootState)).toEqual(
            mockSpeechState.isSettingLocale,
        );
    });
});
