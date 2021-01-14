import Tts from 'react-native-tts';
import {TTSInitPayload} from 'src/types/TTSActionTypes';

export class TTSError extends Error {
    innerError?: Error;
    constructor(message?: string, innerError?: Error) {
        super(message);
        this.innerError = innerError;
    }
}

export default class TextToSpeechService {
    utteranceIds = new Map<number, any>();
    constructor() {
        this.onTtsFinish = this.onTtsFinish.bind(this);
        this.onTtsCancel = this.onTtsCancel.bind(this);
        this.speak = this.speak.bind(this);

        Tts.addEventListener('tts-finish', (event: any) => {
            this.onTtsFinish(event);
        });
        Tts.addEventListener('tts-cancel', (event: any) => {
            this.onTtsCancel(event);
        });
    }

    private onTtsFinish(event: any) {
        let {utteranceId} = event;
        let resolver = this.utteranceIds.get(utteranceId);
        if (resolver != null) {
            let {resolve} = resolver;
            this.utteranceIds.delete(utteranceId);
            resolve();
        }
    }

    private onTtsCancel(event: any) {
        let {utteranceId} = event;
        let resolver = this.utteranceIds.get(utteranceId);
        if (resolver != null) {
            let {reject} = resolver;
            this.utteranceIds.delete(utteranceId);
            reject(new Error('Utterance Canceled'));
        }
    }

    async initialize(): Promise<TTSInitPayload> {
        // Make sure TTS is ready
        await Tts.getInitStatus();

        const voices = await Tts.voices();
        let languages: any[] = [];
        const availableLanguages: any[] = voices
            .filter((v: any) => !v.networkConnectionRequired && !v.notInstalled)
            .reduce((accumulator: any[], current: any) => {
                if (!accumulator.includes(current.language)) {
                    accumulator.push(current.language);
                }
                return accumulator;
            }, languages);
        if (availableLanguages == null || availableLanguages.length === 0) {
            throw new TTSError('No languages found!');
        }
        return {
            availableLanguages,
        };
    }

    async speak(text: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Tts.speak(text)
                .then((utteranceId: number) => {
                    this.utteranceIds.set(utteranceId, {resolve, reject});
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    async stop() {
        try {
            return await Tts.stop();
        } catch (e) {
            throw new TTSError('TTS failed to stop', e);
        }
    }

    async setDefaultLanguage(locale: string) {
        try {
            return await Tts.setDefaultLanguage(locale);
        } catch (e) {
            throw new TTSError('Set Default Language Failed', e);
        }
    }

    async setDefaultPitch(pitch: number) {
        try {
            return await Tts.setDefaultPitch(pitch);
        } catch (e) {
            throw new TTSError('Set Default Pitch Failed', e);
        }
    }

    async setDefaultRate(rate: number) {
        try {
            return await Tts.setDefaultRate(rate);
        } catch (e) {
            throw new TTSError('Set Default Rate Failed', e);
        }
    }
}
