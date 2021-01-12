export interface Task {
    type: string;
    suspend: boolean;
}

export interface TaskList {
    type: string;
    name?: string;
    subTasks: Task[];
}

export interface TTSSayTextTask extends TaskList {
    text: string;
}
export interface TTSPitchTask extends TaskList {
    pitch: number;
}
export interface TTSRateTask extends TaskList {
    rate: number;
}
export interface TTSLocaleTask extends TaskList {
    locale: string;
}

export interface TaskJson {
    taskDefinitions: TaskList[];
}
