import {call, put, takeLatest} from 'redux-saga/effects';
import TextToSpeechService from '../services/TextToSpeech';
import * as actions from '../constants/ActionTypes';

const ttsService = new TextToSpeechService();

function* sayText(action) {
  try {
    let {text} = action.payload;
    yield call(ttsService.speak, text);
    yield put({type: actions.SPEECH_TEXT_SUCCEEDED});
  } catch (error) {
    yield put({type: actions.SPEECH_TEXT_FAILED, error});
  }
}

function* setRate(action) {
  try {
    let {rate} = action.payload;
    yield call(ttsService.setDefaultRate, rate);
    yield put({type: actions.SPEECH_RATE_SUCCEEDED});
  } catch (error) {
    yield put({type: actions.SPEECH_RATE_FAILED, error});
  }
}

function* setPitch(action) {
  try {
    let {pitch} = action.payload;
    yield call(ttsService.setDefaultPitch, pitch);
    yield put({type: actions.SPEECH_PITCH_SUCCEEDED});
  } catch (error) {
    yield put({type: actions.SPEECH_PITCH_FAILED, error});
  }
}

function* setLocale(action) {
  try {
    let {locale} = action.payload;
    yield call(ttsService.setDefaultLanguage, locale);
    yield put({type: actions.SPEECH_LOCALE_SUCCEEDED});
  } catch (error) {
    yield put({type: actions.SPEECH_LOCALE_FAILED, error});
  }
}

// use them in parallel
export default function* rootSaga() {
  yield takeLatest(actions.SPEECH_TEXT_REQUESTED, sayText);
  yield takeLatest(actions.SPEECH_LOCALE_REQUESTED, setLocale);
  yield takeLatest(actions.SPEECH_RATE_REQUESTED, setRate);
  yield takeLatest(actions.SPEECH_PITCH_REQUESTED, setPitch);
}
