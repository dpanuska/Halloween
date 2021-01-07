import {TaskList} from './TaskTypes';

export enum DetectionStates {
    IDLE,
    ACTIVE,
}

export enum RequestStates {
    STARTED = 0,
    SUCCESSFUL,
    FAILED,
    NOT_FETCHED = -1,
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
}

export interface AppState {
    detectionState: DetectionStates;
    configFetchStatus: RequestStates;
    config: AppConfig;
}

export interface TaskConfig {
    activationEventType: string;
    deactivationEventType: string;
    idleEventType: string;
    activeIdleEventType: string;
}

export interface TaskState {
    tasks: TaskList[];
    configFetchStatus: RequestStates;
    taskFetchStatus: RequestStates;
    config: TaskConfig;
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
    task: TaskState;
}
