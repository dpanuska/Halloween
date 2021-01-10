jest.mock('src/selectors/CameraSelectors');

import {testSaga} from 'redux-saga-test-plan';
import cameraSagas, {endObjectDetection} from 'src/sagas/CameraSagas';
import {
    CAMERA_OBJECT_DETECTED,
    CAMERA_SET_TRACKING_OBJECT,
} from 'src/constants/Actions';
import {getDetectionClearDelay} from 'src/selectors/AppSelectors';
import {createMockTask} from '@redux-saga/testing-utils';

describe('AppSagas', () => {
    describe('endObjectDetection', () => {
        it('should delay then set detection object', () => {
            let delay = 1;
            testSaga(endObjectDetection)
                .next()
                .select(getDetectionClearDelay)
                .next(delay)
                .delay(delay)
                .next()
                .cancelled()
                .next(false)
                .put({
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: null,
                    },
                })
                .next()
                .isDone();
        });

        it('should not set detection object', () => {
            let delay = 1;
            testSaga(endObjectDetection)
                .next()
                .select(getDetectionClearDelay)
                .next(delay)
                .delay(delay)
                .next()
                .cancelled()
                .next(true)
                .isDone();
        });
    });

    describe('cameraSagas', () => {
        it('should check for CAMERA_OBJECT_DETECTED', () => {
            let mockObj = {thing: 'stuff'};
            let mockAction = {
                type: CAMERA_OBJECT_DETECTED,
                payload: {
                    data: mockObj,
                },
            };
            testSaga(cameraSagas)
                .next()
                .take(CAMERA_OBJECT_DETECTED)
                .next(mockAction)
                .put({
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: mockObj,
                    },
                })
                .next()
                .fork(endObjectDetection);
        });

        it('should cancel existing task on new action', () => {
            let mockObj = {thing: 'stuff'};
            let mockAction = {
                type: CAMERA_OBJECT_DETECTED,
                payload: {
                    data: mockObj,
                },
            };
            let mockTask = createMockTask();
            testSaga(cameraSagas)
                .next()
                .take(CAMERA_OBJECT_DETECTED)
                .next(mockAction)
                .put({
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: mockObj,
                    },
                })
                .next()
                .fork(endObjectDetection)
                .next(mockTask)
                .take(CAMERA_OBJECT_DETECTED)
                .next(mockAction)
                .cancel(mockTask)
                .next()
                .put({
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: mockObj,
                    },
                })
                .next()
                .fork(endObjectDetection);
        });
    });
});
