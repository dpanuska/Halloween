import {createSelector} from '@reduxjs/toolkit';

import {TaskState, RootState, RequestStates} from 'types/StateTypes';
import {TaskList} from 'types/TaskTypes';

export const getTaskState = (state: RootState): TaskState => state.task;

export const getTaskFetchStatus = (state: RootState) =>
    getTaskState(state).taskFetchStatus;

export const getAreTasksFetched = createSelector(
    getTaskFetchStatus,
    (tasks) => {
        return tasks.status === RequestStates.SUCCESSFUL;
    },
);

export const getAllTasks = createSelector(getTaskFetchStatus, (config) => {
    return config.result;
});

export const getTasksByName = createSelector(getAllTasks, (tasks) => {
    let namedTasks = new Map<string, TaskList>();
    if (tasks == null) {
        return namedTasks;
    }
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

export const getTasksByTypes = createSelector(getAllTasks, (tasks) => {
    let mapByTypes = new Map<string, TaskList[]>();
    if (tasks != null) {
        for (let task of tasks) {
            let list = mapByTypes.get(task.type);
            if (list == null) {
                list = [];
                mapByTypes.set(task.type, list);
            }
            list.push(task);
        }
    }
    return mapByTypes;
});

export const getAllTasksOfType = createSelector(
    getTasksByTypes,
    (_: RootState, type: string) => type,
    (taskMap, type) => {
        return taskMap.get(type) || null;
    },
);

export const getRandomTaskOfType = (state: RootState, type: string) => {
    let tasks = getAllTasksOfType(state, type);
    if (tasks == null) {
        return tasks;
    }
    let rand = Math.floor(Math.random() * tasks.length);
    return tasks[rand];
};

export const getConfigFetchStatus = (state: RootState) =>
    getTaskState(state).configFetchStatus;

export const getIsTaskConfigFetched = createSelector(
    getConfigFetchStatus,
    (config) => {
        return config.status === RequestStates.SUCCESSFUL;
    },
);

export const getActivationEventType = createSelector(
    getConfigFetchStatus,
    (config) => {
        return config.result?.activationEventType;
    },
);

export const getDeactivationEventType = createSelector(
    getConfigFetchStatus,
    (config) => {
        return config.result?.deactivationEventType;
    },
);
export const getIdleEventType = createSelector(
    getConfigFetchStatus,
    (config) => {
        return config.result?.idleEventType;
    },
);

export const getActiveIdleEventType = createSelector(
    getConfigFetchStatus,
    (config) => {
        return config.result?.activeIdleEventType;
    },
);

export const getDefaultLanguage = createSelector(
    getConfigFetchStatus,
    (config) => {
        return config.result?.defaultLanguage;
    },
);
