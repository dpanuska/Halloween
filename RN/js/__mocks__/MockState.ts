// TODO try moving this somewhere or removing completely

import {
    AppState,
    CameraState,
    DetectionStates,
    RequestStates,
    RootState,
    SpeechState,
    TaskState,
    VisualState,
} from 'types/StateTypes';

export const mockAppState: AppState = {
    configFetchStatus: {
        status: RequestStates.SUCCESSFUL,
        result: {
            detectionFrequency: 1,
            deactivationDelay: 1,
            activationDelay: 1,
            detectionClearDelay: 1,
            activeIdleDelay: 1,
            imageQuality: 1,
        },
    },
    detectionState: DetectionStates.ACTIVE,
};

export const mockTaskInit = {
    availableLanguages: [],
};

export const mockSpeechState: SpeechState = {
    initStatus: {
        status: RequestStates.SUCCESSFUL,
        result: mockTaskInit,
    },
    isSpeaking: false,
    isSettingRate: true,
    isSettingPitch: false,
    isSettingLocale: false,
};

export const mockVisualState: VisualState = {
    backgroundResource: null,
    backgroundImage: null,
    text: 'some text',
};

export const mockCameraState: CameraState = {
    isPictureRequested: false,
    takePictureStatus: {
        status: RequestStates.SUCCESSFUL,
    },
    savePictureStatus: {
        status: RequestStates.SUCCESSFUL,
    },
    trackedObject: null,
    useFrontCamera: true,
    aspectRatio: '16:9',
};

export const mockTaskState: TaskState = {
    taskFetchStatus: {
        status: RequestStates.SUCCESSFUL,
        result: [],
    },
    configFetchStatus: {
        status: RequestStates.SUCCESSFUL,
        result: {
            activeIdleEventType: 'TYPE',
            activationEventType: 'TYPE',
            idleEventType: 'TYPE',
            deactivationEventType: 'TYPE',
            defaultLanguage: 'language',
            defaultPitch: 1.0,
            defaultRate: 1.0,
        },
    },
};

export const mockRootState: RootState = {
    app: mockAppState,
    tts: mockSpeechState,
    visual: mockVisualState,
    camera: mockCameraState,
    task: mockTaskState,
};
