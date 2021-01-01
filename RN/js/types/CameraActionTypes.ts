import {PayloadAction} from '@reduxjs/toolkit';

export interface PicuteTakenPayload {
    uri: string;
}

export type PictureTakenAction = PayloadAction<PicuteTakenPayload>;
