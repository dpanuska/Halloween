import {NativeModules, NativeEventEmitter} from 'react-native';
import {
    Hypothesis,
    VoiceEventListener,
    VoiceService,
} from 'src/types/VoiceRecogitionTypes';

const recognition = NativeModules.VoiceRecognition;
const recognitionEmitter = new NativeEventEmitter(recognition);

enum EventTypes {
    HYPOTHESIS = 'Hypothesis',
    STARTED = 'Started',
    STOPPED = 'Stopped',
    SPEECH_DETECTED = 'SpeechDetected',
    SPEECH_ENDED = 'SpeechEnded',
    SUSPENDED = 'Suspended',
    RESUMED = 'Resumed',
}

export default class VoiceRecognitionService implements VoiceService {
    eventListener?: VoiceEventListener;

    constructor() {
        this.onHypothesis = this.onHypothesis.bind(this);
        this.onStarted = this.onStarted.bind(this);
        this.onStopped = this.onStopped.bind(this);

        recognitionEmitter.addListener(
            EventTypes.HYPOTHESIS,
            (event: Hypothesis) => {
                this.onHypothesis(event);
            },
        );
        recognitionEmitter.addListener(EventTypes.STARTED, () => {
            this.onStarted();
        });
        recognitionEmitter.addListener(EventTypes.STOPPED, () => {
            this.onStopped();
        });
    }

    setEventListener(listener: VoiceEventListener) {
        this.eventListener = listener;
    }

    removeEventListener() {
        this.eventListener = undefined;
    }

    async setRecognitionWords(words: String[]) {
        try {
            await recognition.setRecognitionWords(words);
        } catch (error) {
            throw error; // TODO Wrap errors
        }
    }

    async startListening() {
        try {
            await recognition.startListening();
        } catch (error) {
            throw error; // TODO Wrap errors
        }
    }

    async stopListening() {
        try {
            await recognition.stopListening();
        } catch (error) {
            throw error; // TODO Wrap errors
        }
    }

    async suspendListening() {
        try {
            await recognition.suspend();
        } catch (error) {
            throw error; // TODO Wrap errors
        }
    }

    async resumeListening() {
        try {
            await recognition.resume();
        } catch (error) {
            throw error; // TODO Wrap errors
        }
    }

    private onHypothesis(event: Hypothesis) {
        if (this.eventListener != null) {
            this.eventListener.onHypothesis(event);
        }
    }

    private onStarted() {
        if (this.eventListener?.onStarted != null) {
            this.eventListener.onStarted();
        }
    }

    private onStopped() {
        if (this.eventListener?.onStopped != null) {
            this.eventListener.onStopped();
        }
    }
}
