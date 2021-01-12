import taskReducer from 'src/reducers/TaskReducer';
import {
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_STATUS,
} from 'src/constants/Actions';

import {TaskState, RequestStates} from 'types/StateTypes';

let initialState: TaskState = {
    taskFetchStatus: {
        status: RequestStates.SUCCESSFUL,
        result: [],
    },
    configFetchStatus: {
        status: RequestStates.SUCCESSFUL,
        result: {
            activationEventType: 'activation',
            deactivationEventType: 'deactivation',
            idleEventType: 'idle',
            activeIdleEventType: 'active-idle',
            defaultLanguage: 'language',
        },
    },
};

describe('TaskReducer', () => {
    it('should return initial state', () => {
        expect(taskReducer(initialState, {type: 'INVALID'})).toEqual(
            initialState,
        );
    });

    describe('TASK_FETCH_CONFIG_STATUS', () => {
        it('should handle started', () => {
            let action = {
                type: TASK_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                configFetchStatus: {
                    status: RequestStates.STARTED,
                },
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle success', () => {
            let mockConfig = {
                ...initialState.configFetchStatus.result,
                activationEventType: 'newType',
            };
            let action = {
                type: TASK_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockConfig,
                },
            };
            let expectedState = {
                ...initialState,
                configFetchStatus: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockConfig,
                },
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle failure', () => {
            let error = new Error('some error');
            let action = {
                type: TASK_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                configFetchStatus: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('TASK_FETCH_TASKS_STATUS', () => {
        it('should handle started', () => {
            let action = {
                type: TASK_FETCH_TASKS_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                taskFetchStatus: {
                    status: RequestStates.STARTED,
                },
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle success', () => {
            let mockTasks = [{type: 'SomeTask'}];
            let action = {
                type: TASK_FETCH_TASKS_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockTasks,
                },
            };
            let expectedState = {
                ...initialState,
                taskFetchStatus: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockTasks,
                },
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle failure', () => {
            let error = new Error('some error');
            let action = {
                type: TASK_FETCH_TASKS_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                taskFetchStatus: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });
    });
});
