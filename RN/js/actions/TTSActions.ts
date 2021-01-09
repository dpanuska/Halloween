import {
    TTS_SAY_TEXT_REQUESTED,
    TTS_SAY_TEXT_STATUS,
    TTS_SET_LOCALE_REQUESTED,
    TTS_SET_LOCALE_STATUS,
    TTS_SET_PITCH_REQUESTED,
    TTS_SET_PITCH_STATUS,
    TTS_SET_RATE_REQUESTED,
    TTS_SET_RATE_STATUS,
} from '../constants/Actions';
import {
    SayTextAction,
    SetPitchAction,
    SetRateAction,
    SetLocaleAction,
} from 'types/TTSActionTypes';
import {RequestStatusAction} from 'types/ActionTypes';
import {RequestStates} from 'types/StateTypes';

export const sayText = (text: string): SayTextAction => ({
    type: TTS_SAY_TEXT_REQUESTED,
    payload: {
        text,
    },
});

export const sayTextStarted = (): RequestStatusAction => ({
    type: TTS_SAY_TEXT_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const sayTextSucceeded = (): RequestStatusAction => ({
    type: TTS_SAY_TEXT_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const sayTextFailed = (error: Error): RequestStatusAction => ({
    type: TTS_SAY_TEXT_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const setSpeechPitch = (pitch: number): SetPitchAction => ({
    type: TTS_SET_PITCH_REQUESTED,
    payload: {
        pitch,
    },
});

export const setPitchStarted = (): RequestStatusAction => ({
    type: TTS_SET_PITCH_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const setPitchSucceeded = (): RequestStatusAction => ({
    type: TTS_SET_PITCH_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const setPitchFailed = (error: Error): RequestStatusAction => ({
    type: TTS_SET_PITCH_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const setSpeechRate = (rate: number): SetRateAction => ({
    type: TTS_SET_RATE_REQUESTED,
    payload: {
        rate,
    },
});

export const setRateStarted = (): RequestStatusAction => ({
    type: TTS_SET_RATE_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const setRateSucceeded = (): RequestStatusAction => ({
    type: TTS_SET_RATE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const setRateFailed = (error: Error): RequestStatusAction => ({
    type: TTS_SET_RATE_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const setSpeechLocale = (locale: string): SetLocaleAction => ({
    type: TTS_SET_LOCALE_REQUESTED,
    payload: {
        locale,
    },
});

export const setLocaleStarted = (): RequestStatusAction => ({
    type: TTS_SET_LOCALE_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const setLocaleSucceeded = (): RequestStatusAction => ({
    type: TTS_SET_LOCALE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const setLocaleFailed = (error: Error): RequestStatusAction => ({
    type: TTS_SET_LOCALE_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});
