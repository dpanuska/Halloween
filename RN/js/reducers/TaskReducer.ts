import {
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_STATUS,
} from '../constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {RequestStates, TaskState} from 'types/StateTypes';
import {RequestStatusAction} from 'types/ActionTypes';

const initialState: TaskState = {
    tasks: [],
    configFetchStatus: RequestStates.NOT_FETCHED,
    taskFetchStatus: RequestStates.NOT_FETCHED,
    config: {
        activationEventType: 'GREETING',
        deactivationEventType: 'GOODBYE',
        idleEventType: 'IDLE',
        activeIdleEventType: 'ACTIVE_IDLE',
    },
};

function updateConfigFetchStatus(
    state: TaskState,
    action: RequestStatusAction,
): TaskState {
    let {status, result} = action.payload;
    let config = result != null ? result : state.config;
    return {
        ...state,
        configFetchStatus: status,
        config,
    };
}

function updateTaskFetchStatus(
    state: TaskState,
    action: RequestStatusAction,
): TaskState {
    let {status, result} = action.payload;
    let tasks = result != null ? result : state.tasks;
    return {
        ...state,
        taskFetchStatus: status,
        tasks,
    };
}

const reducer = createReducer(initialState, {
    [TASK_FETCH_CONFIG_STATUS]: (
        state: TaskState,
        action: RequestStatusAction,
    ) => updateConfigFetchStatus(state, action),
    [TASK_FETCH_TASKS_STATUS]: (
        state: TaskState,
        action: RequestStatusAction,
    ) => updateTaskFetchStatus(state, action),
});

export default reducer;
