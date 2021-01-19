import {PayloadAction} from '@reduxjs/toolkit';
import {RequestStatusAction} from 'types/ActionTypes';

export interface PictureTakenPayload {
    uri: string;
    width: number;
    height: number;
    base64: any;
    exif?: any;
}

export interface PictureSavedPayload {
    uri: string;
}

export interface ObjectDetectedPayload {
    data: any;
}

export type PictureRequstStatusAction = RequestStatusAction<
    void,
    PictureTakenPayload
>;

export type SaveRequestStatusAction = RequestStatusAction<
    void,
    PictureSavedPayload
>;

export type ObjectDetectedActon = PayloadAction<ObjectDetectedPayload>;
export type SetTrackingObjectAction = ObjectDetectedActon;
