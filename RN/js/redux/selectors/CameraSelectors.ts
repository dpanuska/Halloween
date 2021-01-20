import {createSelector} from '@reduxjs/toolkit';
import {PictureTakenPayload} from 'src/types/CameraActionTypes';
import {
    RootState,
    CameraState,
    RequestActionStatus,
    RequestStates,
} from 'types/StateTypes';

export const getCameraState = (state: RootState): CameraState => state.camera;

export const getAspectRatio = (state: RootState): string =>
    getCameraState(state).aspectRatio;

export const getUseFrontCamera = (state: RootState): boolean =>
    getCameraState(state).useFrontCamera;

export const getIsPictureRequested = (state: RootState): boolean =>
    getCameraState(state).isPictureRequested;

export const getTrackedData = (state: RootState): any =>
    getCameraState(state).trackedObject;

export const getTakePictureStatus = (
    state: RootState,
): RequestActionStatus<void, PictureTakenPayload> =>
    getCameraState(state).takePictureStatus;

export const getIsTakingPicture = createSelector(
    getTakePictureStatus,
    (pic) => {
        return pic.status === RequestStates.STARTED;
    },
);

export const getPictureURI = createSelector(getTakePictureStatus, (pic) => {
    return pic.result?.uri;
});

export const getPictureBase64 = createSelector(getTakePictureStatus, (pic) => {
    return pic.result?.base64;
});
