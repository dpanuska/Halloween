import {
    CAMERA_OBJECT_DETECTED,
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
} from '../constants/Actions';

import {Action} from '@reduxjs/toolkit';
import {RequestStatusAction} from '../types/ActionTypes';
import {RequestStates} from '../types/StateTypes';
import {
    ObjectDetectedActon,
    SetTrackingObjectAction,
} from '../types/CameraActionTypes';

export const takePicture = (): Action => ({
    type: CAMERA_TAKE_PICTURE_REQUESTED,
});

export const takePictureStarted = (): RequestStatusAction => ({
    type: CAMERA_TAKE_PICTURE_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const takePictureSucceeded = (uri: string): RequestStatusAction => ({
    type: CAMERA_TAKE_PICTURE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: uri,
    },
});

export const takePictureFailed = (error: Error): RequestStatusAction => ({
    type: CAMERA_TAKE_PICTURE_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const objectDetected = (data: any): ObjectDetectedActon => ({
    type: CAMERA_OBJECT_DETECTED,
    payload: {
        data,
    },
});

export const setTrackingObject = (data: any): SetTrackingObjectAction => ({
    type: CAMERA_SET_TRACKING_OBJECT,
    payload: {
        data,
    },
});
