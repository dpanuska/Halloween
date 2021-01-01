export enum DetectionStates {
    ACTIVE,
    IDLE,
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

export interface AppState {
    detectionState: DetectionStates;
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
}

export interface RootState {
    app: AppState;
    camera: CameraState;
    visual: VisualState;
    speech: SpeechState;
}
