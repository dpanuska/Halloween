import {TTSInitPayload} from 'types/TTSActionTypes';

export default interface TTSService {
    initialize(): Promise<TTSInitPayload>;
    speak(text: string): Promise<any>;
    setDefaultLanguage(locale: string): Promise<any>;
    setDefaultPitch(pitch: number): Promise<any>;
    setDefaultRate(rate: number): Promise<any>;
    stop(): Promise<any>;
}
