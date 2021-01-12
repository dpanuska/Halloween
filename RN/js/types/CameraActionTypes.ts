import {PayloadAction} from '@reduxjs/toolkit';
import {RequestStatusAction} from 'types/ActionTypes';

export interface PictureTakenPayload {
    uri: string;
}

export interface ObjectDetectedPayload {
    data: any;
}

export type PictureRequstStatusAction = RequestStatusAction<void, string>;
export type ObjectDetectedActon = PayloadAction<ObjectDetectedPayload>;
export type SetTrackingObjectAction = ObjectDetectedActon;
