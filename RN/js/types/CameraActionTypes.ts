import {PayloadAction} from '@reduxjs/toolkit';

export interface PicuteTakenPayload {
    uri: string;
}

export interface ObjectDetectedPayload {
    data: any;
}

export type PictureTakenAction = PayloadAction<PicuteTakenPayload>;
export type ObjectDetectedActon = PayloadAction<ObjectDetectedPayload>;
export type SetTrackingObjectAction = ObjectDetectedActon;
