import {
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_REQUESTED,
    TASK_FETCH_TASKS_STATUS,
} from 'src/constants/Actions';

import {Action} from '@reduxjs/toolkit';
import {RequestStates, TaskConfig} from 'types/StateTypes';
import {
    FetchTasksRequestStatusAction,
    FetchConfigRequestStatusAction,
} from 'types/TaskActionTypes';
import {TaskList} from 'types/TaskTypes';

export const fetchTaskConfig = (): Action => ({
    type: TASK_FETCH_CONFIG_REQUESTED,
});

export const fetchConfigStarted = (): FetchConfigRequestStatusAction => ({
    type: TASK_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const fetchConfigFailed = (
    error: Error,
): FetchConfigRequestStatusAction => ({
    type: TASK_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const fetchConfigSuccess = (
    config: TaskConfig,
): FetchConfigRequestStatusAction => ({
    type: TASK_FETCH_CONFIG_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: config,
    },
});

export const fetchTasks = (): Action => ({
    type: TASK_FETCH_TASKS_REQUESTED,
});

export const fetchTasksStarted = (): FetchTasksRequestStatusAction => ({
    type: TASK_FETCH_TASKS_STATUS,
    payload: {
        status: RequestStates.STARTED,
    },
});

export const fetchTasksFailed = (
    error: Error,
): FetchTasksRequestStatusAction => ({
    type: TASK_FETCH_TASKS_STATUS,
    payload: {
        status: RequestStates.FAILED,
        error,
    },
});

export const fetchTasksSuccess = (
    tasks: TaskList[],
): FetchTasksRequestStatusAction => ({
    type: TASK_FETCH_TASKS_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        result: tasks,
    },
});
