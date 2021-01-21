import {
    CAMERA_OBJECT_DETECTED,
    CAMERA_PREVIEW_PICTURE_REQUESTED,
    CAMERA_PREVIEW_PICTURE_STATUS,
    CAMERA_SAVE_PICTURE_REQUESTED,
    CAMERA_SAVE_PICTURE_STATUS,
    CAMERA_SET_TRACKING_OBJECT,
    CAMERA_TAKE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
} from 'src/constants/Actions';
import {
    setTrackingObject,
    objectDetected,
    takePicture,
    takePictureStarted,
    takePictureFailed,
    takePictureSucceeded,
    savePicture,
    savePictureStarted,
    savePictureSuccess,
    savePictureFailed,
    previewPicture,
    previewPictureStarted,
    previewPictureSuccess,
    previewPictureFailed,
} from 'src/redux/actions/CameraActions';

import {RequestStates} from 'types/StateTypes';

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
        describe('Take Picture', () => {
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
                let mockResult = {
                    uri,
                    width: 1,
                    height: 1,
                    base64: undefined,
                };
                let expectedAction = {
                    type: CAMERA_TAKE_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        result: mockResult,
                    },
                };
                expect(takePictureSucceeded(mockResult)).toEqual(
                    expectedAction,
                );
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

        describe('Save Picture', () => {
            it('should create an action to request saving a picture', () => {
                let expectedAction = {
                    type: CAMERA_SAVE_PICTURE_REQUESTED,
                };
                expect(savePicture()).toEqual(expectedAction);
            });

            it('should create an action to start saving a picture', () => {
                let expectedAction = {
                    type: CAMERA_SAVE_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                };
                expect(savePictureStarted()).toEqual(expectedAction);
            });

            it('should create an action for save a picture success', () => {
                let uri = 'some file uri';
                let mockResult = {
                    uri,
                };
                let expectedAction = {
                    type: CAMERA_SAVE_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        result: mockResult,
                    },
                };
                expect(savePictureSuccess(mockResult)).toEqual(expectedAction);
            });

            it('should create an action for save a picture failure', () => {
                let error = new Error('some error');
                let expectedAction = {
                    type: CAMERA_SAVE_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error,
                    },
                };
                expect(savePictureFailed(error)).toEqual(expectedAction);
            });
        });

        describe('Preview Picture', () => {
            it('should create an action to request previewing a picture', () => {
                let expectedAction = {
                    type: CAMERA_PREVIEW_PICTURE_REQUESTED,
                };
                expect(previewPicture()).toEqual(expectedAction);
            });

            it('should create an action to start previewing a picture', () => {
                let expectedAction = {
                    type: CAMERA_PREVIEW_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                };
                expect(previewPictureStarted()).toEqual(expectedAction);
            });

            it('should create an action for previewing success', () => {
                let expectedAction = {
                    type: CAMERA_PREVIEW_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                    },
                };
                expect(previewPictureSuccess()).toEqual(expectedAction);
            });

            it('should create an action for previewing failure', () => {
                let error = new Error('some error');
                let expectedAction = {
                    type: CAMERA_PREVIEW_PICTURE_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error,
                    },
                };
                expect(previewPictureFailed(error)).toEqual(expectedAction);
            });
        });
    });
});
