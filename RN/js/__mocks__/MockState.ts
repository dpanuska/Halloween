// TODO try moving this somewhere or removing completely

import {
    AppConfig,
    AppState,
    CameraState,
    DetectionStates,
    RequestStates,
    RootState,
    SpeechState,
    TaskState,
    VisualState,
} from 'types/StateTypes';

export const mockAppConfig: AppConfig = {
    detectionFrequency: 1,
    deactivationDelay: 1,
    activationDelay: 1,
    detectionClearDelay: 1,
};

export const mockAppState: AppState = {
    configFetchStatus: RequestStates.NOT_FETCHED,
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

export const mockTaskState: TaskState = {
    tasks: [],
    taskFetchStatus: RequestStates.NOT_FETCHED,
    configFetchStatus: RequestStates.NOT_FETCHED,
    config: {
        activeIdleEventType: 'TYPE',
        activationEventType: 'TYPE',
        idleEventType: 'TYPE',
        deactivationEventType: 'TYPE',
    },
};

export const mockRootState: RootState = {
    app: mockAppState,
    tts: mockSpeechState,
    visual: mockVisualState,
    camera: mockCameraState,
    task: mockTaskState,
};
