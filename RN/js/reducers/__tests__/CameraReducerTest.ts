import cameraReducer from 'src/reducers/CameraReducer';
import {
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
} from 'src/constants/Actions';

import {CameraState, RequestStates} from 'types/StateTypes';

let initialState: CameraState = {
    isPictureRequested: false,
    isTakingPicture: false,
    trackedObject: null,
    useFrontCamera: true,
    aspectRatio: '16:9',
};

describe('AppReducer', () => {
    it('should return initial state', () => {
        expect(cameraReducer(initialState, {type: 'INVALID'})).toEqual(
            initialState,
        );
    });

    it('should handle CAMERA_TAKE_PICTURE_REQUESTED', () => {
        let action = {
            type: CAMERA_TAKE_PICTURE_REQUESTED,
        };
        let expectedState = {
            ...initialState,
            isPictureRequested: true,
        };
        expect(cameraReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CAMERA_TAKE_PICTURE_STATUS Start', () => {
        let mockState = {
            ...initialState,
            isTakingPicture: false,
        };
        let action = {
            type: CAMERA_TAKE_PICTURE_STATUS,
            payload: {
                status: RequestStates.STARTED,
            },
        };
        let expectedState = {
            ...initialState,
            isTakingPicture: true,
        };
        expect(cameraReducer(mockState, action)).toEqual(expectedState);
    });

    it('should handle CAMERA_TAKE_PICTURE_STATUS Success', () => {
        let mockState = {
            ...initialState,
            isTakingPicture: true,
        };
        let action = {
            type: CAMERA_TAKE_PICTURE_STATUS,
            payload: {
                status: RequestStates.SUCCESSFUL,
            },
        };
        let expectedState = {
            ...mockState,
            isTakingPicture: false,
        };
        expect(cameraReducer(mockState, action)).toEqual(expectedState);
    });

    it('should handle CAMERA_TAKE_PICTURE_STATUS Failure', () => {
        let mockState = {
            ...initialState,
            isTakingPicture: true,
        };
        let action = {
            type: CAMERA_TAKE_PICTURE_STATUS,
            payload: {
                status: RequestStates.FAILED,
            },
        };
        let expectedState = {
            ...mockState,
            isTakingPicture: false,
        };
        expect(cameraReducer(mockState, action)).toEqual(expectedState);
    });

    it('should handle CAMERA_SET_TRACKING_OBJECT', () => {
        let mockObj = {
            someProperty: 1,
            other: 'something',
        };
        let action = {
            type: CAMERA_SET_TRACKING_OBJECT,
            payload: {
                data: mockObj,
            },
        };
        let expectedState = {
            ...initialState,
            trackedObject: mockObj,
        };
        expect(cameraReducer(initialState, action)).toEqual(expectedState);
    });
});
