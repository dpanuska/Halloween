import {
    call,
    put,
    takeLatest,
    getContext,
    take,
    select,
    all,
} from 'redux-saga/effects';
import {
    TTS_INIT_REQUESTED,
    TTS_RESET_REQUESTED,
    TTS_SAY_TEXT_REQUESTED,
    TTS_SET_LOCALE_REQUESTED,
    TTS_SET_PITCH_REQUESTED,
    TTS_SET_RATE_REQUESTED,
} from 'src/constants/Actions';
import {
    sayTextStarted,
    sayTextSucceeded,
    sayTextFailed,
    setSpeechLocale,
    setLocaleStarted,
    setLocaleSucceeded,
    setLocaleFailed,
    setSpeechPitch,
    setPitchStarted,
    setPitchSucceeded,
    setPitchFailed,
    setSpeechRate,
    setRateStarted,
    setRateSucceeded,
    setRateFailed,
    initializeStarted,
    initializeSucceeded,
    initializeFailed,
    resetStarted,
    resetSuccess,
    resetFailed,
} from 'src/redux/actions/TTSActions';
import {TTS_SERVICE_KEY} from 'src/constants/ContextEffects';

import {
    SayTextAction,
    SetPitchAction,
    SetRateAction,
    SetLocaleAction,
} from 'types/TTSActionTypes';
import TTSService from 'types/TTSType';
import {
    getDefaultLanguage,
    getDefaultSpeechPitch,
    getDefaultSpeechRate,
} from 'src/redux/selectors/TaskSelectors';
import {getAvailableLanguages} from '../selectors/TTSSelectors';

export function* sayText(action: SayTextAction) {
    try {
        yield put(sayTextStarted(action.payload));

        let ttsService: TTSService = yield getContext(TTS_SERVICE_KEY);
        yield call(ttsService.speak, action.payload.text);

        yield put(sayTextSucceeded(action.payload));
    } catch (error) {
        yield put(sayTextFailed(action.payload, error));
    }
}

export function* setRate(action: SetRateAction) {
    try {
        yield put(setRateStarted(action.payload));

        let ttsService: TTSService = yield getContext(TTS_SERVICE_KEY);
        yield call(ttsService.setDefaultRate, action.payload.rate);

        yield put(setRateSucceeded(action.payload));
    } catch (error) {
        yield put(setRateFailed(action.payload, error));
    }
}

export function* setPitch(action: SetPitchAction) {
    try {
        yield put(setPitchStarted(action.payload));

        let ttsService: TTSService = yield getContext(TTS_SERVICE_KEY);
        yield call(ttsService.setDefaultPitch, action.payload.pitch);

        yield put(setPitchSucceeded(action.payload));
    } catch (error) {
        yield put(setPitchFailed(action.payload, error));
    }
}

export function* setLocale(action: SetLocaleAction) {
    try {
        yield put(setLocaleStarted(action.payload));

        let availableLanguages = yield select(getAvailableLanguages);
        if (!availableLanguages.includes(action.payload.locale)) {
            let error = new Error('Language / Locale not availabe');
            yield put(setLocaleFailed(action.payload, error));
            return;
        }

        let ttsService: TTSService = yield getContext(TTS_SERVICE_KEY);
        yield call(ttsService.setDefaultLanguage, action.payload.locale);

        yield put(setLocaleSucceeded(action.payload));
    } catch (error) {
        yield put(setLocaleFailed(action.payload, error));
    }
}

export function* initialize() {
    try {
        yield put(initializeStarted());

        let ttsService: TTSService = yield getContext(TTS_SERVICE_KEY);
        let payload = yield call(ttsService.initialize);

        yield put(initializeSucceeded(payload));
    } catch (error) {
        yield put(initializeFailed(error));
    }
}

export function* resetDefaults() {
    try {
        yield put(resetStarted());

        let ttsService: TTSService = yield getContext(TTS_SERVICE_KEY);
        yield call(ttsService.stop);

        let defaultLanguage = yield select(getDefaultLanguage);
        let defaultPitch = yield select(getDefaultSpeechPitch);
        let defaultRate = yield select(getDefaultSpeechRate);

        yield all([
            call(setLocale, setSpeechLocale(defaultLanguage)),
            call(setPitch, setSpeechPitch(defaultPitch)),
            call(setRate, setSpeechRate(defaultRate)),
        ]);

        yield put(resetSuccess());
    } catch (error) {
        yield put(resetFailed(error));
    }
}

export default function* rootSaga() {
    yield take(TTS_INIT_REQUESTED);
    yield call(initialize);
    yield takeLatest(TTS_SAY_TEXT_REQUESTED, sayText);
    yield takeLatest(TTS_SET_LOCALE_REQUESTED, setLocale);
    yield takeLatest(TTS_SET_RATE_REQUESTED, setRate);
    yield takeLatest(TTS_SET_PITCH_REQUESTED, setPitch);
    yield takeLatest(TTS_RESET_REQUESTED, resetDefaults);
}
