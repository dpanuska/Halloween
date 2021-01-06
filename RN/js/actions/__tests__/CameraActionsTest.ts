import {
    CAMERA_OBJECT_DETECTED,
    CAMERA_SET_TRACKING_OBJECT,
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
} from '../../constants/Actions';
import {RequestStates} from '../../types/StateTypes';
import {
    setTrackingObject,
    objectDetected,
    takePicture,
    takePictureStarted,
    takePictureFailed,
    takePictureSucceeded,
} from '../CameraActions';

describe('CameraActions', () => {
    describe('Object Detection', () => {
        it('should create an action to set tracked object', () => {
            let trackedObj = {
                somePropery: 'some value',
            };
            let expectedAction = {
                type: CAMERA_SET_TRACKING_OBJECT,
                payload: {
                    data: trackedObj,
                },
            };
            expect(setTrackingObject(trackedObj)).toEqual(expectedAction);
        });

        it('should create an action to set object detected', () => {
            let detected = {
                somePropery: 'some value',
            };
            let expectedAction = {
                type: CAMERA_OBJECT_DETECTED,
                payload: {
                    data: detected,
                },
            };
            expect(objectDetected(detected)).toEqual(expectedAction);
        });
    });

    describe('Picture', () => {
        it('should create an action to request taking a picture', () => {
            let expectedAction = {
                type: CAMERA_TAKE_PICTURE_REQUESTED,
            };
            expect(takePicture()).toEqual(expectedAction);
        });

        it('should create an action to start taking a picture', () => {
            let expectedAction = {
                type: CAMERA_TAKE_PICTURE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(takePictureStarted()).toEqual(expectedAction);
        });

        it('should create an action for taking a picture success', () => {
            let uri = 'some file uri';
            let expectedAction = {
                type: CAMERA_TAKE_PICTURE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: uri,
                },
            };
            expect(takePictureSucceeded(uri)).toEqual(expectedAction);
        });

        it('should create an action for taking a picture failure', () => {
            let error = new Error('some error');
            let expectedAction = {
                type: CAMERA_TAKE_PICTURE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(takePictureFailed(error)).toEqual(expectedAction);
        });
    });
});
