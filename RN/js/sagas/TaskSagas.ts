import {call, put, takeLatest} from 'redux-saga/effects';
import {
    APP_SET_DETECTION_STATE,
    TASK_FETCH_CONFIG_REQUESTED,
    TASK_FETCH_TASKS_REQUESTED,
} from 'src/constants/Actions';
import {sayText} from 'src/actions/TTSActions';
import {
    fetchConfigStarted,
    fetchConfigSuccess,
    fetchConfigFailed,
    fetchTasksStarted,
    fetchTasksSuccess,
    fetchTasksFailed,
} from 'src/actions/TaskActions';
import {fetchTasks, fetchConfiguration} from 'src/services/TaskService';

import {DetectionStateAction} from 'types/AppActionTypes';
import {DetectionStates} from 'types/StateTypes';

// TODO Better service registration - this is fine for now.

function* handleDetectionStateChange(action: DetectionStateAction) {
    let state = action.payload.detectionState;
    if (state === DetectionStates.ACTIVE) {
        // TODO this would start a greeting action
        yield put(sayText('hello there'));
    } else {
        // TODO this would start a goodbye action
        yield put(sayText('goodbye'));
    }
}

function* fetchTaskConfig() {
    try {
        yield put(fetchConfigStarted());
        let config = yield call(fetchConfiguration);
        yield put(fetchConfigSuccess(config));
    } catch (error) {
        yield put(fetchConfigFailed(error));
    }
}

function* fetchAllTasks() {
    try {
        yield put(fetchTasksStarted());
        let tasks = yield call(fetchTasks);
        yield put(fetchTasksSuccess(tasks));
    } catch (error) {
        yield put(fetchTasksFailed(error));
    }
}

export default function* rootSaga() {
    yield takeLatest(TASK_FETCH_CONFIG_REQUESTED, fetchTaskConfig);
    yield takeLatest(TASK_FETCH_TASKS_REQUESTED, fetchAllTasks);
    yield takeLatest(APP_SET_DETECTION_STATE, handleDetectionStateChange);
}
