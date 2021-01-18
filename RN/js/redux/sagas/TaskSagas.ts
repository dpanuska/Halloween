import {
    call,
    cancelled,
    delay,
    fork,
    put,
    select,
    takeEvery,
    takeLatest,
} from 'redux-saga/effects';
import {
    APP_SET_DETECTION_STATE,
    TASK_DISPATCH_NAMED_TASK,
    TASK_DISPATCH_ROOT_TASK_LIST,
    TASK_DISPATCH_TASK_REQUESTED,
    TASK_DISPATCH_TASK_LIST_REQUESTED,
    TASK_DISPATCH_TYPED_TASK,
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_TASKS_REQUESTED,
    TASK_DISPATCH_ROOT_TASK_STATUS,
} from 'src/constants/Actions';
import * as taskActions from 'src/redux/actions/TaskActions';
import {fetchTasks, fetchConfiguration} from 'src/services/TaskService';
import {
    getNamedTask,
    getRandomTaskOfType,
    getActivationEventType,
    getDeactivationEventType,
    getActiveIdleEventType,
} from 'src/redux/selectors/TaskSelectors';
import {getGeneratorForTask} from 'src/services/task/TaskFactory';

import {DetectionStateAction} from 'types/AppActionTypes';
import {DetectionStates, RequestStates} from 'types/StateTypes';
import {
    DispatchNamedTaskAction,
    DispatchTaskAction,
    DispatchTaskListAction,
    DispatchTaskListRequestStatusAction,
    DispatchTypedTaskAction,
} from 'src/types/TaskActionTypes';
import {TaskList, TaskResult} from 'src/types/TaskTypes';
import {getActiveIdleDelay, getDetectionState} from '../selectors/AppSelectors';

export function* handleDetectionStateChange(action: DetectionStateAction) {
    let state = action.payload.detectionState;
    let type =
        state === DetectionStates.ACTIVE
            ? yield select(getActivationEventType)
            : yield select(getDeactivationEventType);
    let taskList = yield select(getRandomTaskOfType, type);
    if (taskList != null) {
        yield put(taskActions.dispatchRootTaskList(taskList));
    } else {
        console.error('Failed to state change task with type', type);
    }
}

export function* fetchTaskConfig() {
    try {
        yield put(taskActions.fetchConfigStarted());
        let config = yield call(fetchConfiguration);
        yield put(taskActions.fetchConfigSuccess(config));
    } catch (error) {
        yield put(taskActions.fetchConfigFailed(error));
    }
}

export function* fetchAllTasks() {
    try {
        yield put(taskActions.fetchTasksStarted());
        let tasks = yield call(fetchTasks);
        yield put(taskActions.fetchTasksSuccess(tasks));
    } catch (error) {
        yield put(taskActions.fetchTasksFailed(error));
    }
}

// Keeping Previous result here for now even though it could be removed.
// Keeps parity w/ original letting subTasks of TaskList pass data.
export function* runSubTask(
    action: DispatchTaskAction,
    previousResult?: TaskResult,
) {
    try {
        yield put(taskActions.dispatchTaskStarted(action.payload));
        let {task} = action.payload;
        let result;
        let taskGen = getGeneratorForTask(task, previousResult);
        if (taskGen == null) {
            let error = new Error('No generator found for task');
            yield put(taskActions.dispatchTaskFailed(action.payload, error));
            return previousResult;
        }
        let {generator, action: taskAction} = taskGen;
        if (generator != null) {
            result = yield call(generator, taskAction) || previousResult;
        } else {
            yield put(taskAction);
        }
        yield put(taskActions.dispatchTaskSuccess(action.payload, result));
        return result;
    } catch (error) {
        yield put(taskActions.dispatchTaskFailed(action.payload, error));
        return previousResult;
    }
}

export function* runTaskList(action: DispatchTaskListAction) {
    try {
        yield put(taskActions.dispatchTaskListStarted(action.payload));

        let {taskList} = action.payload;
        let prevResult: TaskResult;
        for (let task of taskList.subTasks) {
            let subAction = taskActions.dispatchTask(task);
            // Suspending by default since many tasks are async
            if (task.suspend === false) {
                yield fork(runSubTask, subAction);
            } else {
                prevResult = yield call(runSubTask, subAction, prevResult);
            }
        }
        yield put(
            taskActions.dispatchTaskListSuccess(action.payload, prevResult),
        );
    } catch (error) {
        yield put(taskActions.dispatchTaskListFailed(action.payload, error));
    } finally {
        if (yield cancelled()) {
            let error = new Error('Task list dispatch cancelled!');
            yield put(
                taskActions.dispatchTaskListFailed(action.payload, error),
            );
        }
    }
}

export function* queueRootTaskList(action: DispatchTaskListAction) {
    try {
        yield put(taskActions.dispatchRootTaskListStarted(action.payload));
        let result = yield call(runTaskList, action);
        yield put(
            taskActions.dispatchRootTaskListSuccess(action.payload, result),
        );
    } catch (error) {
        yield put(
            taskActions.dispatchRootTaskListFailed(action.payload, error),
        );
    }
}

export function* runNamedTask(action: DispatchNamedTaskAction) {
    yield put(taskActions.dispatchNamedTaskStarted(action.payload));

    let taskList: TaskList = yield select(getNamedTask, action.payload.name);
    if (taskList != null) {
        let result = yield call(
            runTaskList,
            taskActions.dispatchTaskList(taskList),
        );
        yield put(
            taskActions.dispatchNamedTaskListSuccess(action.payload, result),
        );
    } else {
        let error = new Error('Could not find named task');
        yield put(
            taskActions.dispatchNamedTaskListFailed(action.payload, error),
        );
    }
}

export function* runTypedTask(action: DispatchTypedTaskAction) {
    yield put(taskActions.dispatchTypedTaskStarted(action.payload));

    let tasksList: TaskList = yield select(
        getRandomTaskOfType,
        action.payload.type,
    );
    if (tasksList != null) {
        let result = yield call(
            runTaskList,
            taskActions.dispatchTaskList(tasksList),
        );
        yield put(
            taskActions.dispatchTypedTaskListSuccess(action.payload, result),
        );
    } else {
        let error = new Error('Could not find task with type');
        yield put(
            taskActions.dispatchTypedTaskListFailed(action.payload, error),
        );
    }
}

export function* activeIdleActionHandler(
    action: DispatchTaskListRequestStatusAction,
) {
    let detectionState = yield select(getDetectionState);
    if (
        detectionState === DetectionStates.ACTIVE &&
        action.payload.status === RequestStates.SUCCESSFUL
    ) {
        // Start active idle task timer
        let wait = yield select(getActiveIdleDelay);
        yield delay(wait);
        let taskType = yield select(getActiveIdleEventType);
        let activeIdleTask = yield select(getRandomTaskOfType, taskType);
        if (activeIdleTask != null) {
            yield put(taskActions.dispatchRootTaskList(activeIdleTask));
        } else {
            console.error(
                'Could not find active idle task with type',
                taskType,
            );
        }
    }
}

export default function* rootSaga() {
    yield takeLatest(TASK_FETCH_CONFIG_REQUESTED, fetchTaskConfig);
    yield takeLatest(TASK_FETCH_TASKS_REQUESTED, fetchAllTasks);
    yield takeLatest(APP_SET_DETECTION_STATE, handleDetectionStateChange);

    yield takeEvery(TASK_DISPATCH_TASK_REQUESTED, runSubTask);
    yield takeEvery(TASK_DISPATCH_TASK_LIST_REQUESTED, runTaskList);
    yield takeEvery(TASK_DISPATCH_NAMED_TASK, runNamedTask);
    yield takeEvery(TASK_DISPATCH_TYPED_TASK, runTypedTask);

    yield takeLatest(TASK_DISPATCH_ROOT_TASK_LIST, queueRootTaskList);

    yield takeLatest(TASK_DISPATCH_ROOT_TASK_STATUS, activeIdleActionHandler);
}
