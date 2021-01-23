import {PayloadAction} from '@reduxjs/toolkit';
import {RequestStatusAction} from 'src/@types/ActionTypes';
import {TaskConfig} from 'src/types/StateTypes';
import {Task, TaskList, TaskResult} from './TaskTypes';

export interface TaskPayload {
    task: Task;
}

export interface TaskListPayload {
    taskList: TaskList;
}

export interface NamedTaskPayload {
    name: string;
}

export interface TypedTaskPayload {
    type: string;
}

export type DispatchTaskAction = PayloadAction<TaskPayload>;
export type DispatchTaskRequestStatusAction = RequestStatusAction<
    TaskPayload,
    TaskResult
>;

export type DispatchTaskListAction = PayloadAction<TaskListPayload>;
export type DispatchTaskListRequestStatusAction = RequestStatusAction<
    TaskListPayload,
    TaskResult
>;

export type DispatchNamedTaskAction = PayloadAction<NamedTaskPayload>;
export type DispatchNamedRequestStatusAction = RequestStatusAction<
    NamedTaskPayload,
    TaskResult
>;

export type DispatchTypedTaskAction = PayloadAction<TypedTaskPayload>;
export type DispatchTypedRequestStatusAction = RequestStatusAction<
    TypedTaskPayload,
    TaskResult
>;

export type FetchConfigRequestStatusAction = RequestStatusAction<
    void,
    TaskConfig
>;

export type FetchTasksRequestStatusAction = RequestStatusAction<
    void,
    TaskList[]
>;
