import {createReducer} from '@reduxjs/toolkit';
import {
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
    CAMERA_SAVE_PICTURE_STATUS,
} from 'src/constants/Actions';

import {CameraState, RequestStates} from 'types/StateTypes';
import {
    PictureRequstStatusAction,
    SaveRequestStatusAction,
    SetTrackingObjectAction,
} from 'types/CameraActionTypes';

const initialState: CameraState = {
    aspectRatio: '16:9',
    useFrontCamera: true,
    isPictureRequested: false,
    trackedObject: {},
    takePictureStatus: {
        status: RequestStates.NOT_STARTED,
    },
    savePictureStatus: {
        status: RequestStates.NOT_STARTED,
    },
};

function takePictureRequested(state: CameraState): CameraState {
    return {
        ...state,
        isPictureRequested: true,
    };
}

function updateTakePictureStatus(
    state: CameraState,
    action: PictureRequstStatusAction,
): CameraState {
    return {
        ...state,
        takePictureStatus: action.payload,
        isPictureRequested: false,
    };
}

function updateSavePictureStatus(
    state: CameraState,
    action: SaveRequestStatusAction,
): CameraState {
    return {
        ...state,
        savePictureStatus: action.payload,
    };
}

function setTrackingObject(
    state: CameraState,
    action: SetTrackingObjectAction,
): CameraState {
    let {data} = action.payload;
    return {
        ...state,
        trackedObject: data,
    };
}

const reducer = createReducer(initialState, {
    [CAMERA_TAKE_PICTURE_REQUESTED]: (state: CameraState) =>
        takePictureRequested(state),
    [CAMERA_TAKE_PICTURE_STATUS]: (
        state: CameraState,
        action: PictureRequstStatusAction,
    ) => updateTakePictureStatus(state, action),
    [CAMERA_SAVE_PICTURE_STATUS]: (
        state: CameraState,
        action: SaveRequestStatusAction,
    ) => updateSavePictureStatus(state, action),
    [CAMERA_SET_TRACKING_OBJECT]: (
        state: CameraState,
        action: SetTrackingObjectAction,
    ) => setTrackingObject(state, action),
});

export default reducer;
