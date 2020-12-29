export interface VisualState {
  backgroundFile: string | null;
  text: string | null;
}

export enum DetectionState {
  ACTIVE,
  IDLE,
}

export interface AppState {
  detectionState: DetectionState;
}

export interface AllState {
  app: AppState;
  visual: VisualState;
}
