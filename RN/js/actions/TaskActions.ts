import {
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_REQUESTED,
    TASK_FETCH_TASKS_STATUS,
} from '../constants/Actions';

import {Action} from '@reduxjs/toolkit';
import {RequestStates, TaskConfig} from 'types/StateTypes';
import {RequestStatusAction} from 'types/ActionTypes';
import {TaskList} from 'types/TaskTypes';

export const fetchTaskConfig = (): Action => ({
    type: TASK_FETCH_CONFIG_REQUESTED,
});

export const fetchConfigStarted = (): RequestStatusAction => ({
    type: TASK_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const fetchConfigFailed = (error: Error) => ({
    type: TASK_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const fetchConfigSuccess = (
    config: TaskConfig,
): RequestStatusAction => ({
    type: TASK_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: config,
    },
});

export const fetchTasks = (): Action => ({
    type: TASK_FETCH_TASKS_REQUESTED,
});

export const fetchTasksStarted = (): RequestStatusAction => ({
    type: TASK_FETCH_TASKS_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const fetchTasksFailed = (error: Error): RequestStatusAction => ({
    type: TASK_FETCH_TASKS_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const fetchTasksSuccess = (tasks: TaskList[]): RequestStatusAction => ({
    type: TASK_FETCH_TASKS_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: tasks,
    },
});
