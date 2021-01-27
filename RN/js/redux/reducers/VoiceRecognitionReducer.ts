import {
    VOICE_START_RECOGNITION_STATUS,
    VOICE_RESUME_RECOGNITION_STATUS,
    VOICE_STOP_RECOGNITION_STATUS,
    VOICE_SUSPEND_RECOGNITION_STATUS,
    VOICE_HYPOTHESIS_RECIEVED,
} from 'src/constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {VoiceState, RequestStates} from 'types/StateTypes';
import {
    HypothesisAction,
    RecognitionStartStatusAction,
} from 'src/types/VoiceRecognitionActionTypes';
import {RequestStatusAction} from 'src/types/ActionTypes';

const initialState: VoiceState = {
    startListeningStatus: {
        status: RequestStates.NOT_STARTED,
    },
    stopListeningStatus: {
        status: RequestStates.NOT_STARTED,
    },
    resumeListeningStatus: {
        status: RequestStates.NOT_STARTED,
    },
    suspendListeningStatus: {
        status: RequestStates.NOT_STARTED,
    },
    lastHypothesis: undefined,
};

function updateStartRecognitionStatus(
    state: VoiceState,
    action: RecognitionStartStatusAction,
): VoiceState {
    let {status} = action.payload;
    let stopListeningStatus =
        status === RequestStates.SUCCESSFUL
            ? initialState.stopListeningStatus
            : state.stopListeningStatus;

    return {
        ...state,
        startListeningStatus: action.payload,
        stopListeningStatus,
    };
}

function updateStopRecognitionStatus(
    state: VoiceState,
    action: RequestStatusAction,
): VoiceState {
    let {status} = action.payload;
    let startListeningStatus =
        status === RequestStates.SUCCESSFUL
            ? initialState.startListeningStatus
            : state.startListeningStatus;

    return {
        ...state,
        stopListeningStatus: action.payload,
        startListeningStatus,
    };
}

function updateSuspendRecognitionStatus(
    state: VoiceState,
    action: RequestStatusAction,
): VoiceState {
    let {status} = action.payload;
    let resumeListeningStatus =
        status === RequestStates.SUCCESSFUL
            ? initialState.resumeListeningStatus
            : state.resumeListeningStatus;

    return {
        ...state,
        suspendListeningStatus: action.payload,
        resumeListeningStatus,
    };
}

function updateResumeRecognitionStatus(
    state: VoiceState,
    action: RequestStatusAction,
): VoiceState {
    let {status} = action.payload;
    let suspendListeningStatus =
        status === RequestStates.SUCCESSFUL
            ? initialState.suspendListeningStatus
            : state.suspendListeningStatus;

    return {
        ...state,
        resumeListeningStatus: action.payload,
        suspendListeningStatus,
    };
}

function setHypothesis(
    state: VoiceState,
    action: HypothesisAction,
): VoiceState {
    let {hypothesis} = action.payload;
    return {
        ...state,
        lastHypothesis: hypothesis,
    };
}

const reducer = createReducer(initialState, {
    [VOICE_START_RECOGNITION_STATUS]: (
        state: VoiceState,
        action: RecognitionStartStatusAction,
    ) => updateStartRecognitionStatus(state, action),
    [VOICE_STOP_RECOGNITION_STATUS]: (
        state: VoiceState,
        action: RequestStatusAction,
    ) => updateStopRecognitionStatus(state, action),
    [VOICE_SUSPEND_RECOGNITION_STATUS]: (
        state: VoiceState,
        action: RequestStatusAction,
    ) => updateSuspendRecognitionStatus(state, action),
    [VOICE_RESUME_RECOGNITION_STATUS]: (
        state: VoiceState,
        action: RequestStatusAction,
    ) => updateResumeRecognitionStatus(state, action),
    [VOICE_HYPOTHESIS_RECIEVED]: (
        state: VoiceState,
        action: HypothesisAction,
    ) => setHypothesis(state, action),
});

export default reducer;
