// TODO try moving this somewhere or removing completely

import {
    AppConfig,
    AppState,
    CameraState,
    DetectionStates,
    RootState,
    SpeechState,
    VisualState,
} from '../types/StateTypes';

export const mockAppConfig: AppConfig = {
    detectionFrequency: 1,
    deactivationDelay: 1,
    activationDelay: 1,
    detectionClearDelay: 1,
    activeIdleEventType: 'TYPE',
    activationEventType: 'TYPE',
    idleEventType: 'TYPE',
    deactivationEventType: 'TYPE',
};

export const mockAppState: AppState = {
    detectionState: DetectionStates.ACTIVE,
    config: mockAppConfig,
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

export const mockCameraState: CameraState = {
    isPictureRequested: false,
    isTakingPicture: false,
    trackedObject: null,
    useFrontCamera: true,
    aspectRatio: '16:9',
};

export const mockRootState: RootState = {
    app: mockAppState,
    speech: mockSpeechState,
    visual: mockVisualState,
    camera: mockCameraState,
};
