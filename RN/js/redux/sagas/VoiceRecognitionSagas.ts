import {END, eventChannel} from 'redux-saga';
import {
    take,
    takeLatest,
    put,
    fork,
    call,
    getContext,
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

function createVoiceCallbackChannel(voiceService: VoiceService) {
    return eventChannel((emitter) => {
        voiceService.setEventListener({
            onHypothesis(hypothesisData: Hypothesis) {
                emitter({hypothesisData});
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
        const hypothesis = yield take(channel);
        yield put(setRecognitionHypothesis(hypothesis));
    }
}

export function* startRecognitionSaga(action: RecognitionStartAction) {
    try {
        yield put(startRecognitionStarted(action.payload));

        const voiceService: VoiceService = yield getContext(VOICE_SERVICE_KEY);
        yield call(voiceService.setRecognitionWords, action.payload.words);
        yield call(voiceService.startListening);

        yield fork(voiceCallbackSaga);
        yield put(startRecognitionSuccess(action.payload));
    } catch (error) {
        yield put(startRecognitionFailed(action.payload, error));
    }
}

export function* stopRecognitionSaga() {
    try {
        yield put(stopRecognitionStarted());

        const voiceService: VoiceService = yield getContext(VOICE_SERVICE_KEY);
        yield call(voiceService.stopListening);

        yield put(stopRecognitionSuccess());
    } catch (error) {
        yield put(stopRecognitionFailed(error));
    }
}

export function* suspendRecognitionSaga() {
    try {
        yield put(suspendRecognitionStarted());

        const voiceService: VoiceService = yield getContext(VOICE_SERVICE_KEY);
        yield call(voiceService.suspendListening);

        yield put(suspendRecognitionSuccess());
    } catch (error) {
        yield put(suspendRecognitionFailed(error));
    }
}

export function* resumeRecognitionSaga() {
    try {
        yield put(resumeRecognitionStarted());

        const voiceService: VoiceService = yield getContext(VOICE_SERVICE_KEY);
        yield call(voiceService.resumeListening);

        yield put(resumeRecognitionSuccess());
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
