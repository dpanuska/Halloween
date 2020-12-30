import {AppState, DetectionStates, RootState, SpeechState, VisualState} from '../types/StateTypes';

export const mockAppState: AppState = {
    detectionState: DetectionStates.ACTIVE,
};

export const mockSpeechState: SpeechState = {
    isSpeaking: false,
    isSettingRate: true,
    isSettingPitch: false,
    isSettingLocale: false,
};

export const mockVisualState: VisualState = {
    backgroundFile: null,
    text: 'some text',
};

export const mockRootState: RootState = {
    app: mockAppState,
    speech: mockSpeechState,
    visual: mockVisualState,
};
