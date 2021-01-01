import {Camera} from 'expo-camera';
import {
    CAMERA_SET_REF,
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
} from '../constants/Actions';

import {Action} from '@reduxjs/toolkit';
import {SetRefAction} from '../types/CameraActionTypes';
import {RequestStatusAction} from '../types/ActionTypes';
import {RequestStates} from '../types/StateTypes';

export const setCameraRef = (ref: Camera | null): SetRefAction => ({
    type: CAMERA_SET_REF,
    payload: {
        ref,
    },
});

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
