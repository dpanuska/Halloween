import {
    TTS_INIT_STATUS,
    TTS_SAY_TEXT_STATUS,
    TTS_SET_LOCALE_STATUS,
    TTS_SET_PITCH_STATUS,
    TTS_SET_RATE_STATUS,
} from 'src/constants/Actions';
import {createReducer} from '@reduxjs/toolkit';
import {SpeechState, RequestStates} from 'types/StateTypes';
import {
    InitRequestStatusAction,
    SayTextRequestStatusAction,
    SetLocaleRequestStatusAction,
    SetPitchRequestStatusAction,
    SetRateRequestStatusAction,
} from 'types/TTSActionTypes';

const initialState: SpeechState = {
    initStatus: {
        status: RequestStates.NOT_FETCHED,
    },
    isSpeaking: false,
    isSettingLocale: false,
    isSettingPitch: false,
    isSettingRate: false,

    currentLanguage: undefined,
    currentPitch: undefined,
    currentRate: undefined,
};

function updateSayTextStatus(
    state: SpeechState,
    action: SayTextRequestStatusAction,
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
    action: SetLocaleRequestStatusAction,
): SpeechState {
    let {status, params} = action.payload;
    let isSettingLocale = status === RequestStates.STARTED;
    let currentLanguage =
        status === RequestStates.SUCCESSFUL
            ? params?.locale
            : state.currentLanguage;
    return {
        ...state,
        isSettingLocale,
        currentLanguage,
    };
}

function updateRateStatus(
    state: SpeechState,
    action: SetRateRequestStatusAction,
): SpeechState {
    let {status, params} = action.payload;
    var isSettingRate = status === RequestStates.STARTED;
    let currentRate =
        status === RequestStates.SUCCESSFUL ? params?.rate : state.currentRate;
    return {
        ...state,
        isSettingRate,
        currentRate,
    };
}

function updatePitchStatus(
    state: SpeechState,
    action: SetPitchRequestStatusAction,
): SpeechState {
    let {status, params} = action.payload;
    var isSettingPitch = status === RequestStates.STARTED;
    let currentPitch =
        status === RequestStates.SUCCESSFUL
            ? params?.pitch
            : state.currentPitch;
    return {
        ...state,
        isSettingPitch,
        currentPitch,
    };
}

function updateInitStatus(
    state: SpeechState,
    action: InitRequestStatusAction,
): SpeechState {
    return {
        ...state,
        initStatus: action.payload,
    };
}

const reducer = createReducer(initialState, {
    [TTS_SAY_TEXT_STATUS]: (
        state: SpeechState,
        action: SayTextRequestStatusAction,
    ) => updateSayTextStatus(state, action),
    [TTS_SET_LOCALE_STATUS]: (
        state: SpeechState,
        action: SetLocaleRequestStatusAction,
    ) => updateLocaleStatus(state, action),
    [TTS_SET_PITCH_STATUS]: (
        state: SpeechState,
        action: SetPitchRequestStatusAction,
    ) => updatePitchStatus(state, action),
    [TTS_SET_RATE_STATUS]: (
        state: SpeechState,
        action: SetRateRequestStatusAction,
    ) => updateRateStatus(state, action),
    [TTS_INIT_STATUS]: (state: SpeechState, action: InitRequestStatusAction) =>
        updateInitStatus(state, action),
});

export default reducer;
