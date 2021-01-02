import {take, delay, put, fork, cancel, select} from 'redux-saga/effects';
import {CAMERA_SET_TRACKING_OBJECT} from '../constants/Actions';
import {setDetectionState} from '../actions/AppActions';
import {
    getDetectionDelay,
    getDetectionState,
    getEndDetectionDelay,
} from '../selectors/AppSelectors';

import {DetectionStates} from '../types/StateTypes';

function* objectDetectionSet(data: any) {
    let detectionState = yield select(getDetectionState);
    if (detectionState === DetectionStates.ACTIVE && data == null) {
        let clearDelay = yield select(getEndDetectionDelay);
        yield delay(clearDelay);
        yield put(setDetectionState(DetectionStates.IDLE));
    } else if (detectionState === DetectionStates.IDLE && data != null) {
        let activeDelay = yield select(getDetectionDelay);
        yield delay(activeDelay);
        yield put(setDetectionState(DetectionStates.ACTIVE));
    }
}

export default function* objectDetectionFlow() {
    let task;
    while (true) {
        const {data} = yield take(CAMERA_SET_TRACKING_OBJECT);
        if (task) {
            cancel(task);
        }
        task = yield fork(objectDetectionSet, data);
    }
}
