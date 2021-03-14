import {PayloadAction} from '@reduxjs/toolkit';
import {Hypothesis} from 'types/VoiceRecogitionTypes';
import {RecognitionConfig} from 'types/TaskTypes';
import {RequestStatusAction} from './ActionTypes';

export type HypothesisPayload = {
    hypothesisData: Hypothesis;
};

export type RecognitionPayload = {
    configurations: RecognitionConfig[];
};

export type HypothesisAction = PayloadAction<HypothesisPayload>;
export type RecognitionStartAction = PayloadAction<RecognitionPayload>;
export type RecognitionStartStatusAction = RequestStatusAction<
    RecognitionPayload,
    RecognitionPayload
>;
