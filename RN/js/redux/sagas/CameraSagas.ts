import {
    take,
    delay,
    put,
    fork,
    cancel,
    cancelled,
    select,
    takeLatest,
} from 'redux-saga/effects';
import {
    CAMERA_OBJECT_DETECTED,
    CAMERA_PREVIEW_PICTURE_REQUESTED,
    CAMERA_SAVE_PICTURE_REQUESTED,
    CAMERA_TAKE_PICTURE_STATUS,
} from 'src/constants/Actions';
import {
    previewPictureFailed,
    previewPictureStarted,
    previewPictureSuccess,
    savePictureFailed,
    savePictureStarted,
    savePictureSuccess,
    setTrackingObject,
    takePicture,
} from 'src/redux/actions/CameraActions';
import {getDetectionClearDelay} from 'src/redux/selectors/AppSelectors';
import {
    getPictureBase64,
    getTakePictureStatus,
} from '../selectors/CameraSelectors';
import {saveImageFile} from 'src/services/FileService';
import {call} from 'redux-saga-test-plan/matchers';
import {RequestStates} from 'src/types/StateTypes';
import {setBackgroundImage} from '../actions/VisualActions';

export function* endObjectDetection() {
    let endDelay = yield select(getDetectionClearDelay);
    yield delay(endDelay);
    if (!(yield cancelled())) {
        yield put(setTrackingObject(null));
    }
}

export function* objectDetectionFlow() {
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

// A little strange, but using this as a way to make tasks suspend on a take picture action
// since that is tied to UI
// Should not be used from rootSaga here since it literally does nothing
export function* takePictureFlow() {
    yield put(takePicture());
    while (true) {
        let action = yield take(CAMERA_TAKE_PICTURE_STATUS);
        let {status} = action.payload;
        if (
            status === RequestStates.SUCCESSFUL ||
            status === RequestStates.FAILED
        ) {
            break;
        }
    }
}

export function* savePictureFlow() {
    try {
        yield put(savePictureStarted());

        let {status, result} = yield select(getTakePictureStatus);
        if (status !== RequestStates.SUCCESSFUL || result.uri == null) {
            let error = new Error('No Picture has been taken!');
            yield put(savePictureFailed(error));
        } else {
            let saveUri = yield call(saveImageFile, result.uri);
            yield put(savePictureSuccess(saveUri));
        }
    } catch (error) {
        yield put(savePictureFailed(error));
    }
}

export function* previewCameraPicture() {
    let base64 = yield select(getPictureBase64);
    yield put(previewPictureStarted());
    if (base64 == null) {
        let error = new Error('No picture data found. Take a picture first!');
        yield put(previewPictureFailed(error));
    } else {
        yield put(setBackgroundImage(base64));
        yield put(previewPictureSuccess());
    }
}

export default function* rootSaga() {
    takeLatest(CAMERA_SAVE_PICTURE_REQUESTED, savePictureFlow);
    takeLatest(CAMERA_PREVIEW_PICTURE_REQUESTED, previewCameraPicture);
    yield fork(objectDetectionFlow);
}
