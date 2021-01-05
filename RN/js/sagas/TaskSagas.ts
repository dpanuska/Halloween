import {call, put, take, takeLatest} from 'redux-saga/effects';
import {
    APP_INITIALIZE_SERVICES,
    APP_SET_DETECTION_STATE,
} from '../constants/Actions';
import TaskService from '../services/TaskService';
import {sayText} from '../actions/TTSActions';

import {DetectionStateAction} from '../types/AppActionTypes';
import {DetectionStates} from '../types/StateTypes';

// TODO Better service registration - this is fine for now.
const taskService = new TaskService();

function* initialize() {
    taskService.loadTasks();
}

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

export default function* rootSaga() {
    // TODO again - better init/registration
    yield take(APP_INITIALIZE_SERVICES);
    yield call(initialize);
    yield takeLatest(APP_SET_DETECTION_STATE, handleDetectionStateChange);
}
