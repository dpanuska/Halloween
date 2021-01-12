export default interface TTSService {
    initialize(): Promise<any>;
    speak(text: string): Promise<any>;
    setDefaultLanguage(locale: string): Promise<any>;
    setDefaultPitch(pitch: number): Promise<any>;
    setDefaultRate(rate: number): Promise<any>;
}
