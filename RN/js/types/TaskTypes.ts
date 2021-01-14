export interface Task {
    type: string;
    suspend: boolean;
    [x: string]: any;
}

export interface TaskList {
    type: string;
    name?: string;
    subTasks: Task[];
}

export interface TaskJson {
    taskDefinitions: TaskList[];
}

export type TaskResult = any;

// Utility
export interface DelayTask extends Task {
    duration: number;
}

export interface NamedTask extends Task {
    taskName: string;
}

export interface TypedTask extends Task {
    taskType: string;
}

// TTS
export interface TTSSayTextTask extends Task {
    text: string;
}

export interface TTSPitchTask extends Task {
    pitch: number;
}

export interface TTSRateTask extends Task {
    rate: number;
}

export interface TTSLocaleTask extends Task {
    locale: string;
}

export type TTSResetTask = Task;

// VISUAL
export interface VisualBackgroundTask extends Task {
    resource: string;
}

export interface VisualTextTask extends Task {
    text: string;
}

export type VisualBackgroundChainedTask = Task;

export type VisualResetTask = Task;

// CAMERA
export type TakePictureTask = Task;

export type SavePictureTask = Task;

// VOICE
export interface SetRecognitionTask {
    recognition: string;
}
