import {
    getTaskState,
    getConfigFetchStatus,
    getActivationEventType,
    getDeactivationEventType,
    getIsTaskConfigFetched,
    getIdleEventType,
    getActiveIdleEventType,
    getAreTasksFetched,
    getTaskFetchStatus,
    getAllTasks,
    getTasksByTypes,
    getAllTasksOfType,
    getTasksByName,
    getNamedTask,
    getDefaultLanguage,
    getDefaultSpeechPitch,
    getDefaultSpeechRate,
    getRandomTaskOfType,
} from 'src/redux/selectors/TaskSelectors';
import {mockRootState, mockTaskState} from '../../../__mocks__/MockState';

import {RequestStates} from 'types/StateTypes';
import { TaskList } from 'types/TaskTypes';

describe('TaskSelectors', () => {
    it('should get task slice of state', () => {
        expect(getTaskState(mockRootState)).toEqual(mockTaskState);
    });

    it('should get get config fetch status', () => {
        expect(getConfigFetchStatus(mockRootState)).toEqual(
            mockTaskState.configFetchStatus,
        );
    });

    it('should get if task config is fetched', () => {
        expect(getIsTaskConfigFetched(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.status === RequestStates.SUCCESSFUL,
        );
    });

    it('should get activation event type', () => {
        expect(getActivationEventType(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.activationEventType,
        );
    });

    it('should get deactivation event type', () => {
        expect(getDeactivationEventType(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.deactivationEventType,
        );
    });

    it('should get idle event type', () => {
        expect(getIdleEventType(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.idleEventType,
        );
    });

    it('should get active idle event type', () => {
        expect(getActiveIdleEventType(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.activeIdleEventType,
        );
    });

    it('should get default language', () => {
        expect(getDefaultLanguage(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.defaultLanguage,
        );
    });

    it('should get default pitch', () => {
        expect(getDefaultSpeechPitch(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.defaultPitch,
        );
    });

    it('should get default rate', () => {
        expect(getDefaultSpeechRate(mockRootState)).toEqual(
            mockTaskState.configFetchStatus.result?.defaultRate,
        );
    });

    it('should get if tasks fetch status', () => {
        expect(getTaskFetchStatus(mockRootState)).toEqual(
            mockTaskState.taskFetchStatus,
        );
    });

    it('should get if tasks have been fetched', () => {
        expect(getAreTasksFetched(mockRootState)).toEqual(
            mockTaskState.taskFetchStatus.status === RequestStates.SUCCESSFUL,
        );
    });

    it('should get all tasks', () => {
        expect(getAllTasks(mockRootState)).toEqual(
            mockTaskState.taskFetchStatus.result,
        );
    });

    it('should get tasks by type', () => {
        let mockTasks = [
            {type: 'type1', subTasks: []},
            {type: 'type1', subTasks: []},
            {type: 'type2', subTasks: []},
        ];
        let taskState = {
            ...mockTaskState,
            taskFetchStatus: {
                status: RequestStates.SUCCESSFUL,
                result: mockTasks,
            },
        };
        let rootState = {
            ...mockRootState,
            task: taskState,
        };
        let tasks = getTasksByTypes(rootState);
        expect(tasks.size).toEqual(2);
        expect(tasks.has('type1')).toEqual(true);
        expect(tasks.has('type2')).toEqual(true);
        expect(tasks.get('type1')?.length).toEqual(2);
        expect(tasks.get('type2')?.length).toEqual(1);
        expect(tasks.has('null')).toEqual(false);
    });

    it('should get all tasks of a type', () => {
        let mockTasks = [
            {type: 'type1', subTasks: []},
            {type: 'type1', subTasks: []},
            {type: 'type2', subTasks: []},
        ];
        let taskState = {
            ...mockTaskState,
            taskFetchStatus: {
                status: RequestStates.SUCCESSFUL,
                result: mockTasks,
            },
        };
        let rootState = {
            ...mockRootState,
            task: taskState,
        };
        let type1Tasks = getAllTasksOfType(rootState, 'type1');
        expect(type1Tasks?.length).toEqual(2);
        expect(type1Tasks?.[0]).toEqual(mockTasks[0]);
        expect(type1Tasks?.[1]).toEqual(mockTasks[1]);
        expect(getAllTasksOfType(rootState, 'null')).toBeNull();
    });

    it('should get a random task of type', () => {
        let mock1 = {type: 'type1', subTasks: []};
        let mock2 = {type: 'type1', subTasks: []};
        let mockTasks = [mock1, mock2, {type: 'type2', subTasks: []}];
        let taskState = {
            ...mockTaskState,
            taskFetchStatus: {
                status: RequestStates.SUCCESSFUL,
                result: mockTasks,
            },
        };
        let rootState = {
            ...mockRootState,
            task: taskState,
        };
        let type1Task = getRandomTaskOfType(rootState, 'type1');
        expect([mock1, mock2]).toContain(type1Task);
    });

    it('should return null if no tasks of type present', () => {
        let mockTasks = [{type: 'type1', subTasks: []}];
        let taskState = {
            ...mockTaskState,
            taskFetchStatus: {
                status: RequestStates.SUCCESSFUL,
                result: mockTasks,
            },
        };
        let rootState = {
            ...mockRootState,
            task: taskState,
        };
        expect(getRandomTaskOfType(rootState, 'none')).toBeNull();
    });

    it('should get tasks by name', () => {
        let mockTasks = [
            {type: 'type1', name: 'name1', subTasks: []},
            {type: 'type1', name: 'name2', subTasks: []},
            {type: 'type2', name: 'name3', subTasks: []},
        ];
        let taskState = {
            ...mockTaskState,
            taskFetchStatus: {
                status: RequestStates.SUCCESSFUL,
                result: mockTasks,
            },
        };
        let rootState = {
            ...mockRootState,
            task: taskState,
        };
        let tasks = getTasksByName(rootState);
        expect(tasks.size).toEqual(3);
        expect(tasks.has('name1')).toEqual(true);
        expect(tasks.get('name1')).toEqual(mockTasks[0]);
        expect(tasks.has('name2')).toEqual(true);
        expect(tasks.get('name2')).toEqual(mockTasks[1]);
        expect(tasks.has('name3')).toEqual(true);
        expect(tasks.get('name3')).toEqual(mockTasks[2]);
        expect(tasks.has('null')).toEqual(false);
    });

    it('should return empty map if no tasks', () => {
        let mockTasks: TaskList[] = [];
        let taskState = {
            ...mockTaskState,
            taskFetchStatus: {
                status: RequestStates.SUCCESSFUL,
                result: mockTasks,
            },
        };
        let rootState = {
            ...mockRootState,
            task: taskState,
        };
        expect(getTasksByName(rootState).size).toEqual(0);
    });

    it('should get a named task', () => {
        let mockTasksByName = new Map();
        let task1 = {type: 'type1', name: 'name1', subTasks: []};
        let task2 = {type: 'type1', name: 'name2', subTasks: []};
        let task3 = {type: 'type2', name: 'name3', subTasks: []};
        mockTasksByName.set('name1', task1);
        mockTasksByName.set('name2', task2);
        mockTasksByName.set('name3', task3);

        expect(getNamedTask.resultFunc(mockTasksByName, 'name1')).toEqual(
            task1,
        );
        expect(getNamedTask.resultFunc(mockTasksByName, 'name2')).toEqual(
            task2,
        );
        expect(getNamedTask.resultFunc(mockTasksByName, 'name3')).toEqual(
            task3,
        );
        expect(getNamedTask.resultFunc(mockTasksByName, 'null')).toBeNull();
    });
});
