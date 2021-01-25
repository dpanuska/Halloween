export type VoiceEventListener = {
    onHypothesis: (hypothesisData: Hypothesis) => void;
    onStarted?: () => void;
    onStopped?: () => void;
};

export type Hypothesis = {
    hypothesis: string;
    utteranceId?: string;
    score?: string;
};

export interface VoiceService {
    setEventListener(listener: VoiceEventListener): void;
    removeEventListener(): void;
    setRecognitionWords(words: string[]): Promise<any>;
    startListening(): Promise<any>;
    stopListening(): Promise<any>;
    suspendListening(): Promise<any>;
    resumeListening(): Promise<any>;
}
