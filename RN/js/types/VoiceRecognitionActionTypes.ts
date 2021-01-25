import {PayloadAction} from '@reduxjs/toolkit';
import {Hypothesis} from 'types/VoiceRecogitionTypes';

export type HypothesisPayload = {
    hypothesis: Hypothesis;
};

export type RecognitionPayload = {
    words: string[];
};

export type HypothesisAction = PayloadAction<HypothesisPayload>;
export type RecognitionStartAction = PayloadAction<RecognitionPayload>;
