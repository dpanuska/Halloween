import {
    take,
    delay,
    put,
    fork,
    cancel,
    cancelled,
    select,
} from 'redux-saga/effects';
import {CAMERA_OBJECT_DETECTED} from 'src/constants/Actions';
import {setTrackingObject} from 'src/redux/actions/CameraActions';
import {getDetectionClearDelay} from 'src/redux/selectors/AppSelectors';

export function* endObjectDetection() {
    let endDelay = yield select(getDetectionClearDelay);
    yield delay(endDelay);
    if (!(yield cancelled())) {
        yield put(setTrackingObject(null));
    }
}

export default function* objectDetectionFlow() {
    let endTask;
    while (true) {
        let detectAction = yield take(CAMERA_OBJECT_DETECTED);
        let {data} = detectAction.payload;
        if (endTask) {
            yield cancel(endTask);
        }
        yield put(setTrackingObject(data));
        endTask = yield fork(endObjectDetection);
    }
}
