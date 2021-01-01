import {call, put, takeLatest} from 'redux-saga/effects';
import TextToSpeechService from '../services/TTSService';
import * as actions from '../constants/Actions';
import {
    sayTextStarted,
    sayTextSucceeded,
    sayTextFailed,
    setLocaleStarted,
    setLocaleSucceeded,
    setLocaleFailed,
    setPitchStarted,
    setPitchSucceeded,
    setPitchFailed,
    setRateStarted,
    setRateSucceeded,
    setRateFailed,
} from '../actions/TTSActions';

import {
    SayTextAction,
    SetPitchAction,
    SetRateAction,
    SetLocaleAction,
} from '../types/TTSActionTypes';

const ttsService = new TextToSpeechService();

function* sayText(action: SayTextAction) {
    try {
        yield put(sayTextStarted());
        yield call(ttsService.speak, action.payload.text);
        yield put(sayTextSucceeded());
    } catch (error) {
        yield put(sayTextFailed(error));
    }
}

function* setRate(action: SetRateAction) {
    try {
        yield put(setRateStarted());
        yield call(ttsService.setDefaultRate, action.payload.rate);
        yield put(setRateSucceeded());
    } catch (error) {
        yield put(setRateFailed(error));
    }
}

function* setPitch(action: SetPitchAction) {
    try {
        yield put(setPitchStarted());
        yield call(ttsService.setDefaultPitch, action.payload.pitch);
        yield put(setPitchSucceeded());
    } catch (error) {
        yield put(setPitchFailed(error));
    }
}

function* setLocale(action: SetLocaleAction) {
    try {
        yield put(setLocaleStarted());
        yield call(ttsService.setDefaultLanguage, action.payload.locale);
        yield put(setLocaleSucceeded());
    } catch (error) {
        yield put(setLocaleFailed(error));
    }
}

export default function* rootSaga() {
    yield takeLatest(actions.TTS_SAY_TEXT_REQUESTED, sayText);
    yield takeLatest(actions.TTS_SET_LOCALE_REQUESTED, setLocale);
    yield takeLatest(actions.TTS_SET_RATE_REQUESTED, setRate);
    yield takeLatest(actions.TTS_SET_PITCH_REQUESTED, setPitch);
}
