import {PayloadAction} from '@reduxjs/toolkit';

export interface DelayPayload {
    duration: number;
}

export type DelayAction = PayloadAction<DelayPayload>;
