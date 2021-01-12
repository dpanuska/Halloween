import {PayloadAction} from '@reduxjs/toolkit';
import {RequestStatusAction} from './ActionTypes';

export interface TextPayload {
    text: string;
}

export interface LocalePayload {
    locale: string;
}

export interface RatePayload {
    rate: number;
}

export interface PitchPayload {
    pitch: number;
}

export interface TTSInitPayload {
    availableLanguages: string[];
}

export type SayTextAction = PayloadAction<TextPayload>;
export type SetLocaleAction = PayloadAction<LocalePayload>;
export type SetRateAction = PayloadAction<RatePayload>;
export type SetPitchAction = PayloadAction<PitchPayload>;

export type InitRequestStatusAction = RequestStatusAction<void, TTSInitPayload>;

export type SayTextRequestStatusAction = RequestStatusAction<TextPayload, void>;
export type SetLocaleRequestStatusAction = RequestStatusAction<
    LocalePayload,
    void
>;
export type SetRateRequestStatusAction = RequestStatusAction<RatePayload, void>;
export type SetPitchRequestStatusAction = RequestStatusAction<
    PitchPayload,
    void
>;
