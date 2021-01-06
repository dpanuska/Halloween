import {RootState, CameraState} from '../types/StateTypes';
export const getCameraState = (state: RootState): CameraState => state.camera;

export const getAspectRatio = (state: RootState): string =>
    getCameraState(state).aspectRatio;

export const getUseFrontCamera = (state: RootState): boolean =>
    getCameraState(state).useFrontCamera;

export const getIsPictureRequested = (state: RootState): boolean =>
    getCameraState(state).isPictureRequested;

export const getTrackedData = (state: RootState): any =>
    getCameraState(state).trackedObject;

export const getIsTakingPicture = (state: RootState): boolean =>
    getCameraState(state).isTakingPicture;
