declare module 'react-native-tts' {
    export type TTSEvent = {utteranceId: number};

    export function getInitStatus(): Promise<boolean>;
    export function requestInstallEngine(): Promise<any>;
    export function requestInstallData(): Promise<any>;
    export function setDucking(ducking: boolean): Promise<any>;
    export function setDefaultEngine(name: string): Promise<any>;
    export function setDefaultVoice(name: string): Promise<any>;
    export function setDefaultPitch(pitch: number): Promise<any>;
    export function setDefaultRate(rate: number): Promise<any>;
    export function setDefaultLanguage(language: string): Promise<any>;
    export function setIgnoreSilentSwitch(ignore: boolean): Promise<any>;
    export function voices(): Promise<string[]>;
    export function engines(): Promise<string[]>;
    export function speak(utterance: string, options?: any): Promise<any>;
    export function stop(onWordBoundary?: boolean): Promise<any>;
    export function pause(onWordBoundary?: boolean): Promise<any>;
    export function resume(): Promise<any>;
    export function addEventListener(
        type: string,
        handler: (event: TTSEvent) => void,
    ): void;
    export function removeEventListener(
        type: string,
        handler: (event: TTSEvent) => void,
    ): void;
}
