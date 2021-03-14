import {END, eventChannel} from 'redux-saga';
import {
    take,
    takeLatest,
    put,
    fork,
    call,
    getContext,
    cancelled,
} from 'redux-saga/effects';
import {
    VOICE_RESUME_RECOGNITION,
    VOICE_START_RECOGNITION,
    VOICE_STOP_RECOGNITION,
    VOICE_SUSPEND_RECOGNITION,
} from 'src/constants/Actions';
import {
    resumeRecognitionFailed,
    resumeRecognitionStarted,
    resumeRecognitionSuccess,
    setRecognitionHypothesis,
    startRecognitionFailed,
    startRecognitionStarted,
    startRecognitionSuccess,
    stopRecognitionFailed,
    stopRecognitionStarted,
    stopRecognitionSuccess,
    suspendRecognitionFailed,
    suspendRecognitionStarted,
    suspendRecognitionSuccess,
} from 'src/redux/actions/VoiceRecognitionActions';
import {VOICE_SERVICE_KEY} from 'src/constants/ContextEffects';

import {Hypothesis, VoiceService} from 'types/VoiceRecogitionTypes';
import {RecognitionStartAction} from 'types/VoiceRecognitionActionTypes';
import {RecognitionConfig} from 'src/types/TaskTypes';
import {select} from 'redux-saga-test-plan/matchers';
import {
    getIsListening,
    getIsSuspended,
} from '../selectors/VoiceRecognitionSelectors';

function configsToLowercaseWords(configurations: RecognitionConfig[]) {
    return configurations.map((config) => {
        return {
            ...config,
            words: config.words.map((word) => {
                return word.toLowerCase();
            }),
        };
    });
}

function getAllWordsFromConfigs(configurations: RecognitionConfig[]) {
    let words: string[] = [];

    return configurations.reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue.words),
        words,
    );
}

function createVoiceCallbackChannel(voiceService: VoiceService) {
    return eventChannel((emitter) => {
        voiceService.setEventListener({
            onHypothesis(hypothesis: Hypothesis) {
                emitter({hypothesis});
            },
            onStopped() {
                emitter(END);
            },
        });

        return () => {
            voiceService.removeEventListener();
        };
    });
}

export function* voiceCallbackSaga() {
    const voiceService: VoiceService = yield getContext(VOICE_SERVICE_KEY);
    const channel = yield call(createVoiceCallbackChannel, voiceService);

    while (true) {
        const hypothesis: Hypothesis = yield take(channel);
        yield put(setRecognitionHypothesis(hypothesis));
    }
}

export function* startRecognitionSaga(action: RecognitionStartAction) {
    try {
        let isListening = yield select(getIsListening);
        if (!isListening) {
            yield put(startRecognitionStarted(action.payload));

            const voiceService: VoiceService = yield getContext(
                VOICE_SERVICE_KEY,
            );
            let {configurations} = action.payload;

            // Android implementation is picky and needs lowercase words
            let modifiedConfig = configsToLowercaseWords(configurations);
            let allWords = getAllWordsFromConfigs(modifiedConfig);

            yield call(voiceService.setRecognitionWords, allWords);
            yield call(voiceService.startListening);

            yield fork(voiceCallbackSaga);

            // On success use the modifed words so we can compare them from state later
            yield put(
                startRecognitionSuccess({configurations: modifiedConfig}),
            );
        } else {
            yield put(
                startRecognitionFailed(
                    action.payload,
                    new Error('Recognition is already listening'),
                ),
            );
        }
    } catch (error) {
        yield put(startRecognitionFailed(action.payload, error));
    } finally {
        if (yield cancelled()) {
            // If the root task is cancelled, we'll clean up here.
            yield call(stopRecognitionSaga);
        }
    }
}

export function* stopRecognitionSaga() {
    try {
        let isListening = yield select(getIsListening);
        if (isListening) {
            yield put(stopRecognitionStarted());

            const voiceService: VoiceService = yield getContext(
                VOICE_SERVICE_KEY,
            );
            yield call(voiceService.stopListening);

            yield put(stopRecognitionSuccess());
        } else {
            yield put(
                stopRecognitionFailed(
                    new Error('Voice Recognition not currently listening'),
                ),
            );
        }
    } catch (error) {
        yield put(stopRecognitionFailed(error));
    }
}

export function* suspendRecognitionSaga() {
    try {
        let isSuspended = yield select(getIsSuspended);
        if (!isSuspended) {
            yield put(suspendRecognitionStarted());

            const voiceService: VoiceService = yield getContext(
                VOICE_SERVICE_KEY,
            );
            yield call(voiceService.suspendListening);

            yield put(suspendRecognitionSuccess());
        } else {
            yield put(
                suspendRecognitionFailed(
                    new Error('Recognition is already suspended'),
                ),
            );
        }
    } catch (error) {
        yield put(suspendRecognitionFailed(error));
    }
}

export function* resumeRecognitionSaga() {
    try {
        let suspended = yield select(getIsSuspended);
        if (suspended) {
            yield put(resumeRecognitionStarted());

            const voiceService: VoiceService = yield getContext(
                VOICE_SERVICE_KEY,
            );
            yield call(voiceService.resumeListening);

            yield put(resumeRecognitionSuccess());
        } else {
            yield put(
                resumeRecognitionFailed(
                    new Error('Recognition is not suspended'),
                ),
            );
        }
    } catch (error) {
        yield put(resumeRecognitionFailed(error));
    }
}

export default function* rootSaga() {
    yield takeLatest(VOICE_START_RECOGNITION, startRecognitionSaga);
    yield takeLatest(VOICE_STOP_RECOGNITION, stopRecognitionSaga);
    yield takeLatest(VOICE_SUSPEND_RECOGNITION, suspendRecognitionSaga);
    yield takeLatest(VOICE_RESUME_RECOGNITION, resumeRecognitionSaga);
}
