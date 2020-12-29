import {PayloadAction} from '@reduxjs/toolkit';

interface TextPayload {
    text: string;
}

interface LocalePayload {
    locale: string;
}

interface RatePayload {
    rate: number;
}

interface PitchPayload {
    pitch: number;
}

export type SayTextAction = PayloadAction<TextPayload>;
export type SetLocaleAction = PayloadAction<LocalePayload>;
export type SetRateAction = PayloadAction<RatePayload>;
export type SetPitchAction = PayloadAction<PitchPayload>;
