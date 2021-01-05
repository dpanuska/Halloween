export enum DetectionStates {
    IDLE,
    ACTIVE,
}

export enum RequestStates {
    STARTED,
    SUCCESSFUL,
    FAILED,
}

export interface VisualState {
    backgroundFile: string | null;
    text: string | null;
}

export interface AppConfig {
    activationDelay: number;
    deactivationDelay: number;
    detectionFrequency: number;
    detectionClearDelay: number;
    activationEventType: string;
    deactivationEventType: string;
    idleEventType: string;
    activeIdleEventType: string;
}

export interface AppState {
    detectionState: DetectionStates;
    config: AppConfig;
}

export interface SpeechState {
    isSpeaking: boolean;
    isSettingLocale: boolean;
    isSettingPitch: boolean;
    isSettingRate: boolean;
}

export interface CameraState {
    aspectRatio: string;
    useFrontCamera: boolean;
    isTakingPicture: boolean;
    isPictureRequested: boolean;
    trackedObject: any;
}

export interface RootState {
    app: AppState;
    camera: CameraState;
    visual: VisualState;
    speech: SpeechState;
}
