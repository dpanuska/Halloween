import {
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_REQUESTED,
    TASK_FETCH_TASKS_STATUS,
} from '../../constants/Actions';
import {
    fetchTasks,
    fetchTasksStarted,
    fetchTasksFailed,
    fetchTasksSuccess,
    fetchTaskConfig,
    fetchConfigStarted,
    fetchConfigSuccess,
    fetchConfigFailed,
} from '../TaskActions';
import {RequestStates} from '../../types/StateTypes';

describe('TaskActions', () => {
    describe('fetch config', () => {
        it('should create an action to request fetch config', () => {
            let expectedAction = {
                type: TASK_FETCH_CONFIG_REQUESTED,
            };
            expect(fetchTaskConfig()).toEqual(expectedAction);
        });

        it('should create an action for fetch config started', () => {
            let expectedAction = {
                type: TASK_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(fetchConfigStarted()).toEqual(expectedAction);
        });

        it('should create an action for fetch config success', () => {
            let mockConfig = {
                activationEventType: 'activation',
                deactivationEventType: 'deactivation',
                idleEventType: 'idle',
                activeIdleEventType: 'active-idle',
            };
            let expectedAction = {
                type: TASK_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockConfig,
                },
            };
            expect(fetchConfigSuccess(mockConfig)).toEqual(expectedAction);
        });

        it('should create an action for fetch config fail', () => {
            let error = new Error('some error');
            let expectedAction = {
                type: TASK_FETCH_CONFIG_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(fetchConfigFailed(error)).toEqual(expectedAction);
        });
    });

    describe('fetch tasks', () => {
        it('should create an action to request fetch config', () => {
            let expectedAction = {
                type: TASK_FETCH_TASKS_REQUESTED,
            };
            expect(fetchTasks()).toEqual(expectedAction);
        });

        it('should create an action for fetch tasks started', () => {
            let expectedAction = {
                type: TASK_FETCH_TASKS_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(fetchTasksStarted()).toEqual(expectedAction);
        });

        it('should create an action for fetch tasks success', () => {
            let mockTasks = [
                {
                    type: 'type',
                    subTasks: [{type: 'subType', suspend: true}],
                },
            ];
            let expectedAction = {
                type: TASK_FETCH_TASKS_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockTasks,
                },
            };
            expect(fetchTasksSuccess(mockTasks)).toEqual(expectedAction);
        });

        it('should create an action for fetch tasks fail', () => {
            let error = new Error('some error');
            let expectedAction = {
                type: TASK_FETCH_TASKS_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(fetchTasksFailed(error)).toEqual(expectedAction);
        });
    });
});
