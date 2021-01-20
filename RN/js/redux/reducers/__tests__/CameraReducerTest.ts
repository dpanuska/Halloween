import cameraReducer from 'src/redux/reducers/CameraReducer';
import {
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
} from 'src/constants/Actions';

import {CameraState, RequestStates} from 'types/StateTypes';

let initialState: CameraState = {
    isPictureRequested: false,
    takePictureStatus: {
        status: RequestStates.NOT_STARTED,
    },
    savePictureStatus: {
        status: RequestStates.NOT_STARTED,
    },
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
        let mockStatus = {
            status: RequestStates.STARTED,
        };
        let action = {
            type: CAMERA_TAKE_PICTURE_STATUS,
            payload: mockStatus,
        };
        let expectedState = {
            ...initialState,
            takePictureStatus: mockStatus,
        };
        expect(cameraReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CAMERA_TAKE_PICTURE_STATUS Success', () => {
        let mockStatus = {
            status: RequestStates.SUCCESSFUL,
            result: {
                uri: 'some file location',
            },
        };
        let action = {
            type: CAMERA_TAKE_PICTURE_STATUS,
            payload: mockStatus,
        };
        let expectedState = {
            ...initialState,
            takePictureStatus: mockStatus,
        };
        expect(cameraReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CAMERA_TAKE_PICTURE_STATUS Failure', () => {
        let mockStatus = {
            status: RequestStates.FAILED,
            error: new Error('some error'),
        };
        let action = {
            type: CAMERA_TAKE_PICTURE_STATUS,
            payload: mockStatus,
        };
        let expectedState = {
            ...initialState,
            takePictureStatus: mockStatus,
        };
        expect(cameraReducer(initialState, action)).toEqual(expectedState);
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
