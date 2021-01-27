import {TaskList} from 'types/TaskTypes';
import {TTSInitPayload} from 'types/TTSActionTypes';
import {PictureSavedPayload, PictureTakenPayload} from './CameraActionTypes';
import {Hypothesis} from './VoiceRecogitionTypes';
import {RecognitionPayload} from './VoiceRecognitionActionTypes';

export enum DetectionStates {
    IDLE,
    ACTIVE,
}

export enum RequestStates {
    STARTED = 0,
    SUCCESSFUL,
    FAILED,
    NOT_STARTED = -1,
}

export interface VisualState {
    backgroundResource: string | null;
    backgroundImage: {base64: any} | null;
    text: string | null;
}

export interface AppConfig {
    activationDelay: number;
    deactivationDelay: number;
    detectionFrequency: number;
    detectionClearDelay: number;
    activeIdleDelay: number;
    imageQuality: number;
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
    isPictureRequested: boolean;
    trackedObject: any;
    takePictureStatus: RequestActionStatus<void, PictureTakenPayload>;
    savePictureStatus: RequestActionStatus<void, PictureSavedPayload>;
}

export interface VoiceState {
    startListeningStatus: RequestActionStatus<
        RecognitionPayload,
        RecognitionPayload
    >;
    stopListeningStatus: RequestActionStatus;
    resumeListeningStatus: RequestActionStatus;
    suspendListeningStatus: RequestActionStatus;
    lastHypothesis?: Hypothesis;
}

export interface RootState {
    app: AppState;
    camera: CameraState;
    visual: VisualState;
    tts: SpeechState;
    task: TaskState;
    voice: VoiceState;
}
