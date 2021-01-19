import {
    CAMERA_OBJECT_DETECTED,
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
    CAMERA_SAVE_PICTURE_REQUESTED,
    CAMERA_SAVE_PICTURE_STATUS,
} from 'src/constants/Actions';

import {Action} from 'redux';
import {RequestStates} from 'types/StateTypes';
import {
    ObjectDetectedActon,
    PictureRequstStatusAction,
    PictureTakenPayload,
    PictureSavedPayload,
    SaveRequestStatusAction,
    SetTrackingObjectAction,
} from 'types/CameraActionTypes';

export const takePicture = (): Action => ({
    type: CAMERA_TAKE_PICTURE_REQUESTED,
});

export const takePictureStarted = (): PictureRequstStatusAction => ({
    type: CAMERA_TAKE_PICTURE_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const takePictureSucceeded = (
    result: PictureTakenPayload,
): PictureRequstStatusAction => ({
    type: CAMERA_TAKE_PICTURE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result,
    },
});

export const takePictureFailed = (error: Error): PictureRequstStatusAction => ({
    type: CAMERA_TAKE_PICTURE_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const savePicture = (): Action => ({
    type: CAMERA_SAVE_PICTURE_REQUESTED,
});

export const savePictureStarted = (): SaveRequestStatusAction => ({
    type: CAMERA_SAVE_PICTURE_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const savePictureSuccess = (
    result: PictureSavedPayload,
): SaveRequestStatusAction => ({
    type: CAMERA_SAVE_PICTURE_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result,
    },
});

export const savePictureFailed = (error: Error): SaveRequestStatusAction => ({
    type: CAMERA_SAVE_PICTURE_STATUS,
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
