import {
    take,
    takeLatest,
    delay,
    put,
    fork,
    cancel,
    select,
    call,
    cancelled,
} from 'redux-saga/effects';
import {
    APP_FETCH_CONFIG_REQUESTED,
    CAMERA_SET_TRACKING_OBJECT,
} from 'src/constants/Actions';
import {
    setDetectionState,
    fetchConfigStarted,
    fetchConfigSuccess,
    fetchConfigFailed,
} from 'src/actions/AppActions';
import {
    getActivationDelay,
    getDetectionState,
    getDeactivationDelay,
} from 'src/selectors/AppSelectors';
import {fetchConfiguration} from 'src/services/AppService';

import {DetectionStates} from 'types/StateTypes';

export function* objectDetectionSet(data: any) {
    let detectionState = yield select(getDetectionState);
    if (detectionState === DetectionStates.ACTIVE && data == null) {
        let clearDelay = yield select(getDeactivationDelay);
        yield delay(clearDelay);
        if (!(yield cancelled())) {
            yield put(setDetectionState(DetectionStates.IDLE));
        }
    } else if (detectionState === DetectionStates.IDLE && data != null) {
        let activeDelay = yield select(getActivationDelay);
        yield delay(activeDelay);
        if (!(yield cancelled())) {
            yield put(setDetectionState(DetectionStates.ACTIVE));
        }
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

export function* fetchAppConfig() {
    try {
        yield put(fetchConfigStarted());
        let config = yield call(fetchConfiguration);
        yield put(fetchConfigSuccess(config));
    } catch (error) {
        yield put(fetchConfigFailed(error));
    }
}

export default function* rootSaga() {
    yield takeLatest(APP_FETCH_CONFIG_REQUESTED, fetchAppConfig);
    yield fork(objectDetectionFlow);
}
