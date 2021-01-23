import {
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_STATUS,
} from 'src/constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {RequestStates, TaskState} from 'types/StateTypes';
import {
    FetchConfigRequestStatusAction,
    FetchTasksRequestStatusAction,
} from 'types/TaskActionTypes';

const initialState: TaskState = {
    configFetchStatus: {
        status: RequestStates.NOT_STARTED,
    },
    taskFetchStatus: {
        status: RequestStates.NOT_STARTED,
    },
};

function updateConfigFetchStatus(
    state: TaskState,
    action: FetchConfigRequestStatusAction,
): TaskState {
    return {
        ...state,
        configFetchStatus: action.payload,
    };
}

function updateTaskFetchStatus(
    state: TaskState,
    action: FetchTasksRequestStatusAction,
): TaskState {
    return {
        ...state,
        taskFetchStatus: action.payload,
    };
}

const reducer = createReducer(initialState, {
    [TASK_FETCH_CONFIG_STATUS]: (
        state: TaskState,
        action: FetchConfigRequestStatusAction,
    ) => updateConfigFetchStatus(state, action),
    [TASK_FETCH_TASKS_STATUS]: (
        state: TaskState,
        action: FetchTasksRequestStatusAction,
    ) => updateTaskFetchStatus(state, action),
});

export default reducer;
