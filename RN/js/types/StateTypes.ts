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

export interface RootState {
  app: AppState;
  visual: VisualState;
  speech: SpeechState;
}
