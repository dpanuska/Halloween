import {createReducer} from '@reduxjs/toolkit';
import {CAMERA_TAKE_PICTURE_REQUESTED, CAMERA_TAKE_PICTURE_STATUS} from '../constants/Actions';

import {CameraState, RequestStates} from '../types/StateTypes';
import {RequestStatusAction} from '../types/ActionTypes';

const initialState: CameraState = {
    aspectRatio: '16:9',
    useFrontCamera: true,
    isTakingPicture: false,
    isPictureRequested: false,
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

const reducer = createReducer(initialState, {
    [CAMERA_TAKE_PICTURE_REQUESTED]: (state: CameraState) =>
        takePictureRequested(state),
    [CAMERA_TAKE_PICTURE_STATUS]: (
        state: CameraState,
        action: RequestStatusAction,
    ) => updateTakePictureStatus(state, action),
});

export default reducer;
