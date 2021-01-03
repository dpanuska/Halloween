import {take, delay, put, fork, cancel, select} from 'redux-saga/effects';
import {CAMERA_OBJECT_DETECTED} from '../constants/Actions';
import {setTrackingObject} from '../actions/CameraActions';
import {getDetectionClearDelay} from '../selectors/AppSelectors';

function* endObjectDetection() {
    let endDelay = yield select(getDetectionClearDelay);
    yield delay(endDelay);
    yield put(setTrackingObject(null));
}

export default function* objectDetectionFlow() {
    let endTask;
    while (true) {
        let detectAction = yield take(CAMERA_OBJECT_DETECTED);
        let {data} = detectAction.payload;
        yield put(setTrackingObject(data));
        if (endTask) {
            yield cancel(endTask);
        }
        endTask = yield fork(endObjectDetection);
    }
}
