import {
    TASK_DISPATCH_NAMED_STATUS,
    TASK_DISPATCH_NAMED_TASK,
    TASK_DISPATCH_ROOT_TASK_LIST,
    TASK_DISPATCH_ROOT_TASK_STATUS,
    TASK_DISPATCH_TASK_LIST_REQUESTED,
    TASK_DISPATCH_TASK_LIST_STATUS,
    TASK_DISPATCH_TASK_REQUESTED,
    TASK_DISPATCH_TASK_STATUS,
    TASK_DISPATCH_TYPED_STATUS,
    TASK_DISPATCH_TYPED_TASK,
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_CONFIG_STATUS,
    TASK_FETCH_TASKS_REQUESTED,
    TASK_FETCH_TASKS_STATUS,
} from 'src/constants/Actions';
import {
    fetchTasks,
    fetchTasksStarted,
    fetchTasksFailed,
    fetchTasksSuccess,
    fetchTaskConfig,
    fetchConfigStarted,
    fetchConfigSuccess,
    fetchConfigFailed,
    dispatchTask,
    dispatchTaskStarted,
    dispatchTaskSuccess,
    dispatchTaskFailed,
    dispatchTaskList,
    dispatchTaskListStarted,
    dispatchTaskListSuccess,
    dispatchTaskListFailed,
    dispatchRootTaskList,
    dispatchRootTaskListStarted,
    dispatchRootTaskListSuccess,
    dispatchRootTaskListFailed,
    dispatchNamedTask,
    dispatchNamedTaskStarted,
    dispatchNamedTaskListSuccess,
    dispatchNamedTaskListFailed,
    dispatchTypedTask,
    dispatchTypedTaskStarted,
    dispatchTypedTaskListSuccess,
    dispatchTypedTaskListFailed,
} from 'src/redux/actions/TaskActions';
import {TaskListPayload, TaskPayload} from 'types/TaskActionTypes';
import {Task, TaskList} from 'types/TaskTypes';
import {RequestStates} from 'types/StateTypes';

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
                defaultLanguage: 'language',
                defaultPitch: 1.0,
                defaultRate: 1.0,
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

    describe('dispatch actions', () => {
        let mockTask: Task = {
            type: 'some task type',
            suspend: false,
        };
        let mockTaskPayload: TaskPayload = {
            task: mockTask,
        };
        let mockTaskList: TaskList = {
            type: 'some list type',
            subTasks: [mockTask],
        };
        let mockTaskListPayload: TaskListPayload = {
            taskList: mockTaskList,
        };

        describe('task', () => {
            it('should create action for dispatch task', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_REQUESTED,
                    payload: {
                        task: mockTask,
                    },
                };
                expect(dispatchTask(mockTask)).toEqual(expectedAction);
            });

            it('should create action for dispatch task started', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                        params: mockTaskPayload,
                    },
                };
                expect(dispatchTaskStarted(mockTaskPayload)).toEqual(
                    expectedAction,
                );
            });

            it('should create action for dispatch task success', () => {
                let mockResult = 1;
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: mockTaskPayload,
                        result: mockResult,
                    },
                };
                expect(
                    dispatchTaskSuccess(mockTaskPayload, mockResult),
                ).toEqual(expectedAction);
            });

            it('should create action for dispatch task failure', () => {
                let mockError = new Error('error');
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: mockTaskPayload,
                        error: mockError,
                    },
                };
                expect(dispatchTaskFailed(mockTaskPayload, mockError)).toEqual(
                    expectedAction,
                );
            });
        });

        describe('task list', () => {
            it('should create action for dispatching a task list', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_LIST_REQUESTED,
                    payload: {
                        taskList: mockTaskList,
                    },
                };
                expect(dispatchTaskList(mockTaskList)).toEqual(expectedAction);
            });

            it('should create action for dispatch task list started', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_LIST_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                        params: mockTaskListPayload,
                    },
                };
                expect(dispatchTaskListStarted(mockTaskListPayload)).toEqual(
                    expectedAction,
                );
            });

            it('should create action for dispatch task list success', () => {
                let mockResult = 1;
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_LIST_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: mockTaskListPayload,
                        result: mockResult,
                    },
                };
                expect(
                    dispatchTaskListSuccess(mockTaskListPayload, mockResult),
                ).toEqual(expectedAction);
            });

            it('should create action for dispatch task list failure', () => {
                let mockError = new Error('error');
                let expectedAction = {
                    type: TASK_DISPATCH_TASK_LIST_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: mockTaskListPayload,
                        error: mockError,
                    },
                };
                expect(
                    dispatchTaskListFailed(mockTaskListPayload, mockError),
                ).toEqual(expectedAction);
            });
        });

        describe('root task list', () => {
            it('should create action for dispatching root task list', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_ROOT_TASK_LIST,
                    payload: {
                        taskList: mockTaskList,
                    },
                };
                expect(dispatchRootTaskList(mockTaskList)).toEqual(
                    expectedAction,
                );
            });

            it('should create action for dispatch root task list started', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_ROOT_TASK_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                        params: mockTaskListPayload,
                    },
                };
                expect(
                    dispatchRootTaskListStarted(mockTaskListPayload),
                ).toEqual(expectedAction);
            });

            it('should create action for dispatch root task list success', () => {
                let mockResult = 1;
                let expectedAction = {
                    type: TASK_DISPATCH_ROOT_TASK_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: mockTaskListPayload,
                        result: mockResult,
                    },
                };
                expect(
                    dispatchRootTaskListSuccess(
                        mockTaskListPayload,
                        mockResult,
                    ),
                ).toEqual(expectedAction);
            });

            it('should create action for dispatch root task list failure', () => {
                let mockError = new Error('error');
                let expectedAction = {
                    type: TASK_DISPATCH_ROOT_TASK_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: mockTaskListPayload,
                        error: mockError,
                    },
                };
                expect(
                    dispatchRootTaskListFailed(mockTaskListPayload, mockError),
                ).toEqual(expectedAction);
            });
        });

        describe('named task', () => {
            let mockedName = 'some  name';
            let mockedNamedPayload = {
                name: mockedName,
            };

            it('should create action for dispatch named task', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_NAMED_TASK,
                    payload: mockedNamedPayload,
                };
                expect(dispatchNamedTask(mockedName)).toEqual(expectedAction);
            });

            it('should create action for dispatch named started', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_NAMED_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                        params: mockedNamedPayload,
                    },
                };
                expect(dispatchNamedTaskStarted(mockedNamedPayload)).toEqual(
                    expectedAction,
                );
            });

            it('should create action for dispatch named task success', () => {
                let mockResult = 1;
                let expectedAction = {
                    type: TASK_DISPATCH_NAMED_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: mockedNamedPayload,
                        result: mockResult,
                    },
                };
                expect(
                    dispatchNamedTaskListSuccess(
                        mockedNamedPayload,
                        mockResult,
                    ),
                ).toEqual(expectedAction);
            });

            it('should create action for dispatch named task failure', () => {
                let mockError = new Error('error');
                let expectedAction = {
                    type: TASK_DISPATCH_NAMED_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: mockedNamedPayload,
                        error: mockError,
                    },
                };
                expect(
                    dispatchNamedTaskListFailed(mockedNamedPayload, mockError),
                ).toEqual(expectedAction);
            });
        });

        describe('typed task', () => {
            let mockedType = 'some type';
            let mockedTypedPayload = {
                type: mockedType,
            };

            it('should create action for dispatch typed task', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_TYPED_TASK,
                    payload: mockedTypedPayload,
                };
                expect(dispatchTypedTask(mockedType)).toEqual(expectedAction);
            });

            it('should create action for dispatch typed started', () => {
                let expectedAction = {
                    type: TASK_DISPATCH_TYPED_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                        params: mockedTypedPayload,
                    },
                };
                expect(dispatchTypedTaskStarted(mockedTypedPayload)).toEqual(
                    expectedAction,
                );
            });

            it('should create action for dispatch typed task success', () => {
                let mockResult = 1;
                let expectedAction = {
                    type: TASK_DISPATCH_TYPED_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: mockedTypedPayload,
                        result: mockResult,
                    },
                };
                expect(
                    dispatchTypedTaskListSuccess(
                        mockedTypedPayload,
                        mockResult,
                    ),
                ).toEqual(expectedAction);
            });

            it('should create action for dispatch typed task failure', () => {
                let mockError = new Error('error');
                let expectedAction = {
                    type: TASK_DISPATCH_TYPED_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: mockedTypedPayload,
                        error: mockError,
                    },
                };
                expect(
                    dispatchTypedTaskListFailed(mockedTypedPayload, mockError),
                ).toEqual(expectedAction);
            });
        });
    });
});
