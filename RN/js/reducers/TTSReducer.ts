import {
    TTS_SAY_TEXT_STATUS,
    TTS_SET_LOCALE_STATUS,
    TTS_SET_PITCH_STATUS,
    TTS_SET_RATE_STATUS,
} from 'src/constants/Actions';
import {RequestStatusAction} from 'types/ActionTypes';
import {createReducer} from '@reduxjs/toolkit';
import {SpeechState, RequestStates} from 'types/StateTypes';

const initialState: SpeechState = {
    isSpeaking: false,
    isSettingLocale: false,
    isSettingPitch: false,
    isSettingRate: false,
};

function updateSayTextStatus(
    state: SpeechState,
    action: RequestStatusAction,
): SpeechState {
    let {status} = action.payload;
    var isSpeaking = status === RequestStates.STARTED;
    return {
        ...state,
        isSpeaking,
    };
}

function updateLocaleStatus(
    state: SpeechState,
    action: RequestStatusAction,
): SpeechState {
    let {status} = action.payload;
    var isSettingLocale = status === RequestStates.STARTED;
    return {
        ...state,
        isSettingLocale,
    };
}

function updateRateStatus(
    state: SpeechState,
    action: RequestStatusAction,
): SpeechState {
    let {status} = action.payload;
    var isSettingRate = status === RequestStates.STARTED;
    return {
        ...state,
        isSettingRate,
    };
}

function updatePitchStatus(
    state: SpeechState,
    action: RequestStatusAction,
): SpeechState {
    let {status} = action.payload;
    var isSettingPitch = status === RequestStates.STARTED;
    return {
        ...state,
        isSettingPitch,
    };
}

const reducer = createReducer(initialState, {
    [TTS_SAY_TEXT_STATUS]: (state: SpeechState, action: RequestStatusAction) =>
        updateSayTextStatus(state, action),
    [TTS_SET_LOCALE_STATUS]: (
        state: SpeechState,
        action: RequestStatusAction,
    ) => updateLocaleStatus(state, action),
    [TTS_SET_PITCH_STATUS]: (state: SpeechState, action: RequestStatusAction) =>
        updatePitchStatus(state, action),
    [TTS_SET_RATE_STATUS]: (state: SpeechState, action: RequestStatusAction) =>
        updateRateStatus(state, action),
});

export default reducer;
