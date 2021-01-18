import {
    getSpeechState,
    getIsSpeaking,
    getIsSettingRate,
    getIsSettingPitch,
    getIsSettingLocale,
    getInitState,
    getIsInitialized,
    getAvailableLanguages,
} from 'src/redux/selectors/TTSSelectors';
import {RequestStates} from 'src/types/StateTypes';
import {mockSpeechState, mockRootState} from '../../../__mocks__/MockState';

describe('TTSSelectors', () => {
    it('should get speech slice of state', () => {
        expect(getSpeechState(mockRootState)).toEqual(mockSpeechState);
    });

    it('should get init status', () => {
        expect(getInitState(mockRootState)).toEqual(mockSpeechState.initStatus);
    });

    it('should get is initialized', () => {
        expect(getIsInitialized(mockRootState)).toEqual(
            mockSpeechState.initStatus.status === RequestStates.SUCCESSFUL,
        );
    });

    it('should get available languages', () => {
        expect(getAvailableLanguages(mockRootState)).toEqual(
            mockSpeechState.initStatus.result?.availableLanguages,
        );
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
