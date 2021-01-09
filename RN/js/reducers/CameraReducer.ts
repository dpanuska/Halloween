import {createReducer} from '@reduxjs/toolkit';
import {
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
} from '../constants/Actions';

import {CameraState, RequestStates} from 'types/StateTypes';
import {RequestStatusAction} from 'types/ActionTypes';
import {SetTrackingObjectAction} from 'types/CameraActionTypes';

const initialState: CameraState = {
    aspectRatio: '16:9',
    useFrontCamera: true,
    isTakingPicture: false,
    isPictureRequested: false,
    trackedObject: {},
};

function takePictureRequested(state: CameraState): CameraState {
    return {
        ...state,
        isPictureRequested: true,
    };
}

function updateTakePictureStatus(
    state: CameraState,
    action: RequestStatusAction,
): CameraState {
    let {status} = action.payload;
    var isTakingPicture = status === RequestStates.STARTED;
    return {
        ...state,
        isTakingPicture,
        isPictureRequested: false,
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
        action: RequestStatusAction,
    ) => updateTakePictureStatus(state, action),
    [CAMERA_SET_TRACKING_OBJECT]: (
        state: CameraState,
        action: SetTrackingObjectAction,
    ) => setTrackingObject(state, action),
});

export default reducer;
