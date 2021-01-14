import {TaskList} from 'types/TaskTypes';
import {TTSInitPayload} from 'types/TTSActionTypes';

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

export interface RequestActionStatus<P = void, R = void> {
    status: RequestStates;
    params?: P;
    result?: R;
    error?: Error;
}

export interface AppState {
    detectionState: DetectionStates;
    configFetchStatus: RequestActionStatus<void, AppConfig>;
}

export interface TaskConfig {
    activationEventType: string;
    deactivationEventType: string;
    idleEventType: string;
    activeIdleEventType: string;
    defaultLanguage: string;
    defaultPitch: number;
    defaultRate: number;
}

export interface TaskState {
    configFetchStatus: RequestActionStatus<void, TaskConfig>;
    taskFetchStatus: RequestActionStatus<void, TaskList[]>;
}

export interface SpeechState {
    initStatus: RequestActionStatus<void, TTSInitPayload>;
    isSpeaking: boolean;
    isSettingLocale: boolean;
    isSettingPitch: boolean;
    isSettingRate: boolean;
    currentLanguage?: string;
    currentPitch?: number;
    currentRate?: number | null;
}

export interface CameraState {
    aspectRatio: string;
    useFrontCamera: boolean;
    isTakingPicture: boolean; // TODO - use request pattern
    isPictureRequested: boolean;
    trackedObject: any;
}

export interface RootState {
    app: AppState;
    camera: CameraState;
    visual: VisualState;
    tts: SpeechState;
    task: TaskState;
}
