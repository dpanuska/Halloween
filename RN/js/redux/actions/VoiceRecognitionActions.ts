import {
    VOICE_HYPOTHESIS_RECIEVED,
    VOICE_START_RECOGNITION,
    VOICE_STOP_RECOGNITION,
    VOICE_SUSPEND_RECOGNITION,
    VOICE_RESUME_RECOGNITION,
    VOICE_START_RECOGNITION_STATUS,
    VOICE_STOP_RECOGNITION_STATUS,
    VOICE_SUSPEND_RECOGNITION_STATUS,
    VOICE_RESUME_RECOGNITION_STATUS,
} from 'src/constants/Actions';

import {Action} from 'redux';
import {Hypothesis} from 'src/types/VoiceRecogitionTypes';
import {
    HypothesisAction,
    RecognitionPayload,
} from 'src/types/VoiceRecognitionActionTypes';
import {RequestStates} from 'src/types/StateTypes';
import {RequestStatusAction} from 'src/types/ActionTypes';

export const startRecognition = (words: string[]) => ({
    type: VOICE_START_RECOGNITION,
    payload: {
        words,
    },
});

export const startRecognitionStarted = (params: RecognitionPayload) => ({
    type: VOICE_START_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const startRecognitionSuccess = (params: RecognitionPayload) => ({
    type: VOICE_START_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
    },
});

export const startRecognitionFailed = (
    params: RecognitionPayload,
    error: Error,
) => ({
    type: VOICE_START_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const stopRecognition = (): Action => ({
    type: VOICE_STOP_RECOGNITION,
});

export const stopRecognitionStarted = (): RequestStatusAction => ({
    type: VOICE_STOP_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const stopRecognitionSuccess = (): RequestStatusAction => ({
    type: VOICE_STOP_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const stopRecognitionFailed = (error: Error): RequestStatusAction => ({
    type: VOICE_STOP_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const suspendRecognition = (): Action => ({
    type: VOICE_SUSPEND_RECOGNITION,
});

export const suspendRecognitionStarted = (): RequestStatusAction => ({
    type: VOICE_SUSPEND_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const suspendRecognitionSuccess = (): RequestStatusAction => ({
    type: VOICE_SUSPEND_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const suspendRecognitionFailed = (
    error: Error,
): RequestStatusAction => ({
    type: VOICE_SUSPEND_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const resumeRecognition = (): Action => ({
    type: VOICE_RESUME_RECOGNITION,
});

export const resumeRecognitionStarted = (): RequestStatusAction => ({
    type: VOICE_RESUME_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const resumeRecognitionSuccess = (): RequestStatusAction => ({
    type: VOICE_RESUME_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
    },
});

export const resumeRecognitionFailed = (error: Error): RequestStatusAction => ({
    type: VOICE_RESUME_RECOGNITION_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const setRecognitionHypothesis = (
    hypothesisData: Hypothesis,
): HypothesisAction => ({
    type: VOICE_HYPOTHESIS_RECIEVED,
    payload: {
        hypothesis: hypothesisData,
    },
});
