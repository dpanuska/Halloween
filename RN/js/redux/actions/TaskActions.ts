import {
    TASK_DISPATCH_TASK_REQUESTED,
    TASK_DISPATCH_TASK_STATUS,
    TASK_DISPATCH_NAMED_TASK,
    TASK_DISPATCH_TYPED_TASK,
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_REQUESTED,
    TASK_FETCH_TASKS_STATUS,
    TASK_DISPATCH_ROOT_TASK_LIST,
    TASK_DISPATCH_ROOT_TASK_STATUS,
    TASK_DISPATCH_TASK_LIST_STATUS,
    TASK_DISPATCH_TASK_LIST_REQUESTED,
    TASK_DISPATCH_NAMED_STATUS,
    TASK_DISPATCH_TYPED_STATUS,
} from 'src/constants/Actions';

import {Action} from 'redux';
import {RequestStates, TaskConfig} from 'types/StateTypes';
import {
    FetchTasksRequestStatusAction,
    FetchConfigRequestStatusAction,
    DispatchTaskAction,
    TaskPayload,
    DispatchTaskRequestStatusAction,
    DispatchNamedTaskAction,
    DispatchTypedTaskAction,
    DispatchTaskListAction,
    TaskListPayload,
    DispatchTaskListRequestStatusAction,
    TypedTaskPayload,
    DispatchTypedRequestStatusAction,
    NamedTaskPayload,
    DispatchNamedRequestStatusAction,
} from 'types/TaskActionTypes';
import {Task, TaskList, TaskResult} from 'types/TaskTypes';

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

export const dispatchTask = (task: Task): DispatchTaskAction => ({
    type: TASK_DISPATCH_TASK_REQUESTED,
    payload: {
        task,
    },
});

export const dispatchTaskStarted = (
    params: TaskPayload,
): DispatchTaskRequestStatusAction => ({
    type: TASK_DISPATCH_TASK_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const dispatchTaskSuccess = (
    params: TaskPayload,
    result: TaskResult,
): DispatchTaskRequestStatusAction => ({
    type: TASK_DISPATCH_TASK_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
        result,
    },
});

export const dispatchTaskFailed = (
    params: TaskPayload,
    error: Error,
): DispatchTaskRequestStatusAction => ({
    type: TASK_DISPATCH_TASK_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const dispatchTaskList = (
    taskList: TaskList,
): DispatchTaskListAction => ({
    type: TASK_DISPATCH_TASK_LIST_REQUESTED,
    payload: {
        taskList,
    },
});

export const dispatchTaskListStarted = (
    params: TaskListPayload,
): DispatchTaskListRequestStatusAction => ({
    type: TASK_DISPATCH_TASK_LIST_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const dispatchTaskListSuccess = (
    params: TaskListPayload,
    result: TaskResult,
): DispatchTaskListRequestStatusAction => ({
    type: TASK_DISPATCH_TASK_LIST_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
        result,
    },
});

export const dispatchTaskListFailed = (
    params: TaskListPayload,
    error: Error,
): DispatchTaskListRequestStatusAction => ({
    type: TASK_DISPATCH_TASK_LIST_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const dispatchNamedTask = (name: string): DispatchNamedTaskAction => ({
    type: TASK_DISPATCH_NAMED_TASK,
    payload: {
        name,
    },
});

export const dispatchNamedTaskStarted = (
    params: NamedTaskPayload,
): DispatchNamedRequestStatusAction => ({
    type: TASK_DISPATCH_NAMED_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const dispatchNamedTaskListSuccess = (
    params: NamedTaskPayload,
    result: TaskResult,
): DispatchNamedRequestStatusAction => ({
    type: TASK_DISPATCH_NAMED_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
        result,
    },
});

export const dispatchNamedTaskListFailed = (
    params: NamedTaskPayload,
    error: Error,
): DispatchNamedRequestStatusAction => ({
    type: TASK_DISPATCH_NAMED_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const dispatchTypedTask = (type: string): DispatchTypedTaskAction => ({
    type: TASK_DISPATCH_TYPED_TASK,
    payload: {
        type,
    },
});

export const dispatchTypedTaskStarted = (
    params: TypedTaskPayload,
): DispatchTypedRequestStatusAction => ({
    type: TASK_DISPATCH_TYPED_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const dispatchTypedTaskListSuccess = (
    params: TypedTaskPayload,
    result: TaskResult,
): DispatchTypedRequestStatusAction => ({
    type: TASK_DISPATCH_TYPED_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
        result,
    },
});

export const dispatchTypedTaskListFailed = (
    params: TypedTaskPayload,
    error: Error,
): DispatchTypedRequestStatusAction => ({
    type: TASK_DISPATCH_TYPED_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});

export const dispatchRootTaskList = (
    taskList: TaskList,
): DispatchTaskListAction => ({
    type: TASK_DISPATCH_ROOT_TASK_LIST,
    payload: {
        taskList,
    },
});

export const dispatchRootTaskListStarted = (
    params: TaskListPayload,
): DispatchTaskListRequestStatusAction => ({
    type: TASK_DISPATCH_ROOT_TASK_STATUS,
    payload: {
        status: RequestStates.STARTED,
        params,
    },
});

export const dispatchRootTaskListSuccess = (
    params: TaskListPayload,
    result: TaskResult,
): DispatchTaskListRequestStatusAction => ({
    type: TASK_DISPATCH_ROOT_TASK_STATUS,
    payload: {
        status: RequestStates.SUCCESSFUL,
        params,
        result,
    },
});

export const dispatchRootTaskListFailed = (
    params: TaskListPayload,
    error: Error,
): DispatchTaskListRequestStatusAction => ({
    type: TASK_DISPATCH_ROOT_TASK_STATUS,
    payload: {
        status: RequestStates.FAILED,
        params,
        error,
    },
});
