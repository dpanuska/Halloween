import {take, delay, put, fork, cancel, select, call} from 'redux-saga/effects';
import {
    APP_INITIALIZE_SERVICES,
    CAMERA_SET_TRACKING_OBJECT,
} from '../constants/Actions';
import {setDetectionState, setConfiguration} from '../actions/AppActions';
import {
    getActivationDelay,
    getDetectionState,
    getDeactivationDelay,
} from '../selectors/AppSelectors';
import appConfig from 'res/config';

import {DetectionStates} from '../types/StateTypes';

export function* objectDetectionSet(data: any) {
    let detectionState = yield select(getDetectionState);
    if (detectionState === DetectionStates.ACTIVE && data == null) {
        let clearDelay = yield select(getDeactivationDelay);
        yield delay(clearDelay);
        yield put(setDetectionState(DetectionStates.IDLE));
    } else if (detectionState === DetectionStates.IDLE && data != null) {
        let activeDelay = yield select(getActivationDelay);
        yield delay(activeDelay);
        yield put(setDetectionState(DetectionStates.ACTIVE));
    }
}

export function* objectDetectionFlow() {
    let task;
    let prevDetection;
    while (true) {
        let setAction = yield take(CAMERA_SET_TRACKING_OBJECT);
        let {data} = setAction.payload;
        let detection = data != null;
        if (prevDetection !== detection) {
            if (task) {
                yield cancel(task);
            }
            task = yield fork(objectDetectionSet, data);
        }
        prevDetection = detection;
    }
}

// TODO make some kind of central initialization
export function* initialize() {
    yield put(setConfiguration(appConfig));
}

export default function* rootSaga() {
    yield take(APP_INITIALIZE_SERVICES);
    yield call(initialize);
    yield fork(objectDetectionFlow);
}
