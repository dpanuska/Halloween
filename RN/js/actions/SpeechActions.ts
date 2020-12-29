import {
  SPEECH_SAY_TEXT_REQUESTED,
  SPEECH_SAY_TEXT_STATUS,
  SPEECH_SET_LOCALE_REQUESTED,
  SPEECH_SET_LOCALE_STATUS,
  SPEECH_SET_PITCH_REQUESTED,
  SPEECH_SET_PITCH_STATUS,
  SPEECH_SET_RATE_REQUESTED,
  SPEECH_SET_RATE_STATUS,
} from '../constants/Actions';
import {
  SayTextAction,
  SetPitchAction,
  SetRateAction,
  SetLocaleAction,
} from '../types/SpeechActionTypes';
import {RequestStatusAction} from '../types/ActionTypes';
import {RequestStates} from '../types/StateTypes';

export const sayText = (text: string): SayTextAction => ({
  type: SPEECH_SAY_TEXT_REQUESTED,
  payload: {
    text,
  },
});

export const sayTextStarted = (): RequestStatusAction => ({
  type: SPEECH_SAY_TEXT_STATUS,
  payload: {
    status: RequestStates.STARTED,
  },
});

export const sayTextSucceeded = (): RequestStatusAction => ({
  type: SPEECH_SAY_TEXT_STATUS,
  payload: {
    status: RequestStates.SUCCESSFUL,
  },
});

export const sayTextFailed = (error: Error): RequestStatusAction => ({
  type: SPEECH_SAY_TEXT_STATUS,
  payload: {
    status: RequestStates.FAILED,
    error,
  },
});

export const setSpeechPitch = (pitch: number): SetPitchAction => ({
  type: SPEECH_SET_PITCH_REQUESTED,
  payload: {
    pitch,
  },
});

export const setPitchStarted = (): RequestStatusAction => ({
  type: SPEECH_SET_PITCH_STATUS,
  payload: {
    status: RequestStates.STARTED,
  },
});

export const setPitchSucceeded = (): RequestStatusAction => ({
  type: SPEECH_SET_PITCH_STATUS,
  payload: {
    status: RequestStates.SUCCESSFUL,
  },
});

export const setPitchFailed = (error: Error): RequestStatusAction => ({
  type: SPEECH_SET_PITCH_STATUS,
  payload: {
    status: RequestStates.FAILED,
    error,
  },
});

export const setSpeechRate = (rate: number): SetRateAction => ({
  type: SPEECH_SET_RATE_REQUESTED,
  payload: {
    rate,
  },
});

export const setRateStarted = (): RequestStatusAction => ({
  type: SPEECH_SET_RATE_STATUS,
  payload: {
    status: RequestStates.STARTED,
  },
});

export const setRateSucceeded = (): RequestStatusAction => ({
  type: SPEECH_SET_RATE_STATUS,
  payload: {
    status: RequestStates.SUCCESSFUL,
  },
});

export const setRateFailed = (error: Error): RequestStatusAction => ({
  type: SPEECH_SET_RATE_STATUS,
  payload: {
    status: RequestStates.FAILED,
    error,
  },
});

export const setSpeechLocale = (locale: string): SetLocaleAction => ({
  type: SPEECH_SET_LOCALE_REQUESTED,
  payload: {
    locale,
  },
});

export const setLocaleStarted = (): RequestStatusAction => ({
  type: SPEECH_SET_LOCALE_STATUS,
  payload: {
    status: RequestStates.STARTED,
  },
});

export const setLocaleSucceeded = (): RequestStatusAction => ({
  type: SPEECH_SET_LOCALE_STATUS,
  payload: {
    status: RequestStates.SUCCESSFUL,
  },
});

export const setLocaleFailed = (error: Error): RequestStatusAction => ({
  type: SPEECH_SET_LOCALE_STATUS,
  payload: {
    status: RequestStates.FAILED,
    error,
  },
});
