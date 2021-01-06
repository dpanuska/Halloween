import taskReducer from '../TaskReducer';
import {
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_STATUS,
} from '../../constants/Actions';
import {TaskState, RequestStates} from '../../types/StateTypes';

let initialState: TaskState = {
    tasks: [],
    taskFetchStatus: RequestStates.NOT_FETCHED,
    configFetchStatus: RequestStates.NOT_FETCHED,
    config: {
        activationEventType: 'activation',
        deactivationEventType: 'deactivation',
        idleEventType: 'idle',
        activeIdleEventType: 'active-idle',
    },
};

describe('AppReducer', () => {
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
                configFetchStatus: RequestStates.STARTED,
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle success', () => {
            let mockConfig = {
                ...initialState.config,
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
                configFetchStatus: RequestStates.SUCCESSFUL,
                config: mockConfig,
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
                configFetchStatus: RequestStates.FAILED,
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
                taskFetchStatus: RequestStates.STARTED,
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
                taskFetchStatus: RequestStates.SUCCESSFUL,
                tasks: mockTasks,
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
                taskFetchStatus: RequestStates.FAILED,
            };
            expect(taskReducer(initialState, action)).toEqual(expectedState);
        });
    });
});
