import {take, delay, put, fork, cancel, select} from 'redux-saga/effects';
import {CAMERA_OBJECT_DETECTED} from 'src/constants/Actions';
import {setTrackingObject} from 'src/actions/CameraActions';
import {getDetectionClearDelay} from 'src/selectors/AppSelectors';

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
        if (endTask) {
            yield cancel(endTask);
        }
        yield put(setTrackingObject(data));
        endTask = yield fork(endObjectDetection);
    }
}
