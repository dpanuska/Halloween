export interface BaseTask {
    type: string;
    name?: string;
    subTasks: [BaseTask];
    suspend: boolean;
}
export interface TTSSayTextTask extends BaseTask {
    text: string;
}
export interface TTSPitchTask extends BaseTask {
    pitch: number;
}
export interface TTSRateTask extends BaseTask {
    rate: number;
}
export interface TTSLocaleTask extends BaseTask {
    locale: string;
}

export interface TaskJson {
    taskDefinitions: [BaseTask]
}
