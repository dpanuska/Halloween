import {
    TTS_INIT_REQUESTED,
    TTS_INIT_STATUS,
    TTS_RESET_REQUESTED,
    TTS_RESET_STATUS,
    TTS_SAY_TEXT_REQUESTED,
    TTS_SAY_TEXT_STATUS,
    TTS_SET_LOCALE_REQUESTED,
    TTS_SET_LOCALE_STATUS,
    TTS_SET_PITCH_REQUESTED,
    TTS_SET_PITCH_STATUS,
    TTS_SET_RATE_REQUESTED,
    TTS_SET_RATE_STATUS,
} from 'src/constants/Actions';

import {
    SayTextAction,
    SetPitchAction,
    SetRateAction,
    SetLocaleAction,
    SayTextRequestStatusAction,
    SetLocaleRequestStatusAction,
    SetPitchRequestStatusAction,
    SetRateRequestStatusAction,
    TextPayload,
    PitchPayload,
    RatePayload,
    LocalePayload,
    InitRequestStatusAction,
    TTSInitPayload,
} from 'types/TTSActionTypes';
import {RequestStates} from 'types/StateTypes';
import {Action} from 'redux';
import {RequestStatusAction} from 'types/ActionTypes';

export const initialize = (): Action => ({
    type: TTS_INIT_REQUESTED,
});

export const initializeStarted = (): InitRequestStatusAction => ({
    type: TTS_INIT_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const initializeSucceeded = (
    result: TTSInitPayload,
): InitRequestStatusAction => ({
    type: TTS_INIT_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: result,
    },
});

export const initializeFailed = (error: Error): InitRequestStatusAction => ({
    type: TTS_INIT_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const sayText = (text: string): SayTextAction => ({
    type: TTS_SAY_TEXT_REQUESTED,
    payload: {
        text,
    },
});

export const sayTextStarted = (
    params: TextPayload,
): SayTextRequestStatusAction => ({
    type: TTS_SAY_TEXT_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const sayTextSucceeded = (
    params: TextPayload,
): SayTextRequestStatusAction => ({
    type: TTS_SAY_TEXT_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
    },
});

export const sayTextFailed = (
    params: TextPayload,
    error: Error,
): SayTextRequestStatusAction => ({
    type: TTS_SAY_TEXT_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const setSpeechPitch = (pitch: number): SetPitchAction => ({
    type: TTS_SET_PITCH_REQUESTED,
    payload: {
        pitch,
    },
});

export const setPitchStarted = (
    params: PitchPayload,
): SetPitchRequestStatusAction => ({
    type: TTS_SET_PITCH_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const setPitchSucceeded = (
    params: PitchPayload,
): SetPitchRequestStatusAction => ({
    type: TTS_SET_PITCH_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
    },
});

export const setPitchFailed = (
    params: PitchPayload,
    error: Error,
): SetPitchRequestStatusAction => ({
    type: TTS_SET_PITCH_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const setSpeechRate = (rate: number): SetRateAction => ({
    type: TTS_SET_RATE_REQUESTED,
    payload: {
        rate,
    },
});

export const setRateStarted = (
    params: RatePayload,
): SetRateRequestStatusAction => ({
    type: TTS_SET_RATE_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const setRateSucceeded = (
    params: RatePayload,
): SetRateRequestStatusAction => ({
    type: TTS_SET_RATE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
    },
});

export const setRateFailed = (
    params: RatePayload,
    error: Error,
): SetRateRequestStatusAction => ({
    type: TTS_SET_RATE_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const setSpeechLocale = (locale: string): SetLocaleAction => ({
    type: TTS_SET_LOCALE_REQUESTED,
    payload: {
        locale,
    },
});

export const setLocaleStarted = (
    params: LocalePayload,
): SetLocaleRequestStatusAction => ({
    type: TTS_SET_LOCALE_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const setLocaleSucceeded = (
    params: LocalePayload,
): SetLocaleRequestStatusAction => ({
    type: TTS_SET_LOCALE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
    },
});

export const setLocaleFailed = (
    params: LocalePayload,
    error: Error,
): SetLocaleRequestStatusAction => ({
    type: TTS_SET_LOCALE_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const reset = (): Action => ({
    type: TTS_RESET_REQUESTED,
});

export const resetStarted = (): RequestStatusAction => ({
    type: TTS_RESET_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const resetSuccess = (): RequestStatusAction => ({
    type: TTS_RESET_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const resetFailed = (error: Error): RequestStatusAction => ({
    type: TTS_RESET_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});
