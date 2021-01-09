import {createSelector} from '@reduxjs/toolkit';

import {TaskState, RootState, RequestStates} from 'types/StateTypes';
import {TaskList} from 'types/TaskTypes';

export const getTaskState = (state: RootState): TaskState => state.task;

export const getTaskFetchStatus = (state: RootState) =>
    getTaskState(state).taskFetchStatus;

export const getAreTasksFetched = createSelector(
    getTaskFetchStatus,
    (status) => {
        return status === RequestStates.SUCCESSFUL;
    },
);

export const getAllTasks = (state: RootState): TaskList[] =>
    getTaskState(state).tasks;

export const getTasksByName = createSelector(getAllTasks, (tasks) => {
    let namedTasks = new Map<string, TaskList>();
    for (let task of tasks) {
        if (task.name != null) {
            namedTasks.set(task.name, task);
        }
    }
    return namedTasks;
});

export const getNamedTask = createSelector(
    getTasksByName,
    (_: RootState, name: string) => name,
    (tasks, name) => {
        return tasks.get(name) || null;
    },
);

export const getTasksByTypes = createSelector(getAllTasks, (tasks) =>
    filterTasksByType(tasks),
);

function filterTasksByType(tasks: TaskList[]) {
    let mapByTypes = new Map<string, TaskList[]>();
    for (let task of tasks) {
        let list = mapByTypes.get(task.type);
        if (list == null) {
            list = [];
            mapByTypes.set(task.type, list);
        }
        list.push(task);
    }
    return mapByTypes;
}

export const getAllTasksOfType = createSelector(
    getTasksByTypes,
    (_: RootState, type: string) => type,
    (taskMap, type) => {
        return taskMap.get(type) || null;
    },
);

export const getConfigFetchStatus = (state: RootState) =>
    getTaskState(state).configFetchStatus;

export const getIsTaskConfigFetched = createSelector(
    getConfigFetchStatus,
    (status) => {
        return status === RequestStates.SUCCESSFUL;
    },
);

export const getTaskConfig = (state: RootState) => getTaskState(state).config;

export const getActivationEventType = (state: RootState): string =>
    getTaskConfig(state).activationEventType;

export const getDeactivationEventType = (state: RootState): string =>
    getTaskConfig(state).deactivationEventType;

export const getIdleEventType = (state: RootState): string =>
    getTaskConfig(state).idleEventType;

export const getActiveIdleEventType = (state: RootState): string =>
    getTaskConfig(state).activeIdleEventType;
