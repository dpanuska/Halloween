jest.mock('src/services/AppService');
jest.mock('src/redux/selectors/AppSelectors');

import {expectSaga, testSaga} from 'redux-saga-test-plan';
import {mocked} from 'ts-jest/utils';
import appSagas, {
    objectDetectionFlow,
    objectDetectionSet,
} from 'src/redux/sagas/AppSagas';
import {
    APP_FETCH_CONFIG_REQUESTED,
    APP_FETCH_CONFIG_STATUS,
    APP_SET_DETECTION_STATE,
    CAMERA_SET_TRACKING_OBJECT,
} from 'src/constants/Actions';
import {fetchConfiguration} from 'src/services/AppService';
import {
    getActivationDelay,
    getDetectionState,
    getDeactivationDelay,
} from 'src/redux/selectors/AppSelectors';
import {createMockTask} from '@redux-saga/testing-utils';

import {DetectionStates, RequestStates} from 'types/StateTypes';
import {AppConfig} from 'types/StateTypes';

describe('AppSagas', () => {
    describe('APP_FETCH_CONFIG_REQUESTED', () => {
        it('should handle successful config fetch', () => {
            let mockConfig: AppConfig = {
                activationDelay: 1,
                deactivationDelay: 1,
                detectionClearDelay: 1,
                detectionFrequency: 1,
                activeIdleDelay: 1,
            };
            mocked(fetchConfiguration).mockImplementation(() => {
                return Promise.resolve(mockConfig);
            });
            return expectSaga(appSagas)
                .put({
                    type: APP_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .call(fetchConfiguration)
                .put({
                    type: APP_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        result: mockConfig,
                    },
                })
                .dispatch({type: APP_FETCH_CONFIG_REQUESTED})
                .silentRun();
        });

        it('should handle failed config fetch', () => {
            let mockError = new Error('error');
            mocked(fetchConfiguration).mockImplementation(() => {
                return Promise.reject(mockError);
            });
            return expectSaga(appSagas)
                .put({
                    type: APP_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .call(fetchConfiguration)
                .put({
                    type: APP_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error: mockError,
                    },
                })
                .dispatch({type: APP_FETCH_CONFIG_REQUESTED})
                .silentRun();
        });
    });

    describe('CAMERA_SET_TRACKING_OBJECT', () => {
        it('should handle transition to active state', () => {
            let activeDelay = 1;
            let detectionState = DetectionStates.IDLE;
            let mockObj = {thing: 'stuff'};

            return expectSaga(appSagas)
                .provide({
                    select({selector}, next) {
                        if (selector === getActivationDelay) {
                            return activeDelay;
                        }
                        if (selector === getDetectionState) {
                            return detectionState;
                        }
                        return next();
                    },
                })
                .select(getActivationDelay)
                .delay(activeDelay)
                .put({
                    type: APP_SET_DETECTION_STATE,
                    payload: {
                        detectionState: DetectionStates.ACTIVE,
                    },
                })
                .dispatch({
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: mockObj,
                    },
                })
                .silentRun();
        });

        it('should handle transition to idle state', () => {
            let deactiveDelay = 1;
            let detectionState = DetectionStates.ACTIVE;

            return expectSaga(appSagas)
                .provide({
                    select({selector}, next) {
                        if (selector === getDeactivationDelay) {
                            return deactiveDelay;
                        }
                        if (selector === getDetectionState) {
                            return detectionState;
                        }
                        return next();
                    },
                })
                .select(getDeactivationDelay)
                .delay(deactiveDelay)
                .put({
                    type: APP_SET_DETECTION_STATE,
                    payload: {
                        detectionState: DetectionStates.IDLE,
                    },
                })
                .dispatch({
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: null,
                    },
                })
                .silentRun();
        });

        describe('objectDetectionSet', () => {
            it('should check for put active action', () => {
                let detectionState = DetectionStates.IDLE;
                let delay = 1;
                let data = {thing: 'stuff'};
                testSaga(objectDetectionSet, data)
                    .next()
                    .select(getDetectionState)
                    .next(detectionState)
                    .select(getActivationDelay)
                    .next(delay)
                    .delay(delay)
                    .next()
                    .cancelled()
                    .next(false)
                    .put({
                        type: APP_SET_DETECTION_STATE,
                        payload: {
                            detectionState: DetectionStates.ACTIVE,
                        },
                    })
                    .next()
                    .isDone();
            });

            it('should check for cancellation before putting active action', () => {
                let detectionState = DetectionStates.IDLE;
                let delay = 1;
                let data = {thing: 'stuff'};
                testSaga(objectDetectionSet, data)
                    .next()
                    .select(getDetectionState)
                    .next(detectionState)
                    .select(getActivationDelay)
                    .next(delay)
                    .delay(delay)
                    .next()
                    .cancelled()
                    .next(true)
                    .isDone();
            });

            it('should check for put idle action', () => {
                let detectionState = DetectionStates.ACTIVE;
                let delay = 1;
                let data = null;
                testSaga(objectDetectionSet, data)
                    .next()
                    .select(getDetectionState)
                    .next(detectionState)
                    .select(getDeactivationDelay)
                    .next(delay)
                    .delay(delay)
                    .next()
                    .cancelled()
                    .next(false)
                    .put({
                        type: APP_SET_DETECTION_STATE,
                        payload: {
                            detectionState: DetectionStates.IDLE,
                        },
                    })
                    .next()
                    .isDone();
            });

            it('should check for cancellation before putting idle action', () => {
                let detectionState = DetectionStates.ACTIVE;
                let delay = 1;
                let data = null;
                testSaga(objectDetectionSet, data)
                    .next()
                    .select(getDetectionState)
                    .next(detectionState)
                    .select(getDeactivationDelay)
                    .next(delay)
                    .delay(delay)
                    .next()
                    .cancelled()
                    .next(true)
                    .isDone();
            });
        });
        describe('objectDetectionFlow', () => {
            it('should fork objectDetectionSet when CAMERA_SET_TRACKING_OBJECT occurs', () => {
                let mockObj = {thing: 'stuff'};
                let mockAction = {
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: mockObj,
                    },
                };
                testSaga(objectDetectionFlow)
                    .next()
                    .take(CAMERA_SET_TRACKING_OBJECT)
                    .next(mockAction)
                    .fork(objectDetectionSet, mockObj);
            });

            it('should cancel existing task on new action', () => {
                let mockObj = {thing: 'stuff'};
                let mockAction = {
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: mockObj,
                    },
                };
                let mockRemoveAction = {
                    type: CAMERA_SET_TRACKING_OBJECT,
                    payload: {
                        data: null,
                    },
                };
                let mockTask = createMockTask();

                testSaga(objectDetectionFlow)
                    .next()
                    .take(CAMERA_SET_TRACKING_OBJECT)
                    .next(mockAction)
                    .fork(objectDetectionSet, mockObj)
                    .next(mockTask)
                    .take(CAMERA_SET_TRACKING_OBJECT)
                    .next(mockRemoveAction)
                    .cancel(mockTask)
                    .next()
                    .fork(objectDetectionSet, null);
            });
        });
    });
});
