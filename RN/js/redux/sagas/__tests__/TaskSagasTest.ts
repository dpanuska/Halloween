jest.mock('src/services/TaskService');

import {testSaga, expectSaga} from 'redux-saga-test-plan';
import {
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_TASKS_REQUESTED,
    APP_SET_DETECTION_STATE,
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_STATUS,
} from 'src/constants/Actions';
import taskSagas, {
    fetchAllTasks,
    fetchTaskConfig,
    handleDetectionStateChange,
} from 'src/redux/sagas/TaskSagas';
import {fetchTasks, fetchConfiguration} from 'src/services/TaskService';
import {RequestStates, TaskConfig} from 'src/types/StateTypes';
import {TaskList} from 'src/types/TaskTypes';
import {mocked} from 'ts-jest/utils';

describe('TaskSagas', () => {
    describe('rootSaga', () => {
        it('should respond to actions', () => {
            testSaga(taskSagas)
                .next()
                .takeLatest(TASK_FETCH_CONFIG_REQUESTED, fetchTaskConfig)
                .next()
                .takeLatest(TASK_FETCH_TASKS_REQUESTED, fetchAllTasks)
                .next()
                .takeLatest(
                    APP_SET_DETECTION_STATE,
                    handleDetectionStateChange,
                );
        });

        it('should handle successful task config fetch', () => {
            let mockConfig: TaskConfig = {
                activationEventType: 'activation',
                deactivationEventType: 'deactivation',
                idleEventType: 'idle',
                activeIdleEventType: 'active-idle',
                defaultLanguage: 'language',
            };
            mocked(fetchConfiguration).mockImplementation(() => {
                return Promise.resolve(mockConfig);
            });
            return expectSaga(taskSagas)
                .put({
                    type: TASK_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .call(fetchConfiguration)
                .put({
                    type: TASK_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        result: mockConfig,
                    },
                })
                .dispatch({type: TASK_FETCH_CONFIG_REQUESTED})
                .silentRun();
        });

        it('should handle failed task config fetch', () => {
            let mockError = new Error('error');
            mocked(fetchConfiguration).mockImplementation(() => {
                return Promise.reject(mockError);
            });
            return expectSaga(taskSagas)
                .put({
                    type: TASK_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .call(fetchConfiguration)
                .put({
                    type: TASK_FETCH_CONFIG_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error: mockError,
                    },
                })
                .dispatch({type: TASK_FETCH_CONFIG_REQUESTED})
                .silentRun();
        });

        it('should handle successful task fetch', () => {
            let mockTasks: TaskList[] = [{type: 'type', subTasks: []}];
            mocked(fetchTasks).mockImplementation(() => {
                return Promise.resolve(mockTasks);
            });
            return expectSaga(taskSagas)
                .put({
                    type: TASK_FETCH_TASKS_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .call(fetchTasks)
                .put({
                    type: TASK_FETCH_TASKS_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        result: mockTasks,
                    },
                })
                .dispatch({type: TASK_FETCH_TASKS_REQUESTED})
                .silentRun();
        });

        it('should handle failed task fetch', () => {
            let mockError = new Error('error');
            mocked(fetchTasks).mockImplementation(() => {
                return Promise.reject(mockError);
            });
            return expectSaga(taskSagas)
                .put({
                    type: TASK_FETCH_TASKS_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .call(fetchTasks)
                .put({
                    type: TASK_FETCH_TASKS_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error: mockError,
                    },
                })
                .dispatch({type: TASK_FETCH_TASKS_REQUESTED})
                .silentRun();
        });
    });

    describe('fetchAllTasks', () => {});
    describe('fetchTaskConfig', () => {});
    // TODO when actual tasks are used
    describe('handleDetectionStateChange', () => {});
});
