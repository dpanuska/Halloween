import {delay, takeEvery} from 'redux-saga/effects';
import {UTILITY_DELAY} from 'src/constants/Actions';
import {DelayAction} from 'src/types/UtilityActionTypes';

export function* delayTask(action: DelayAction) {
    delay(action.payload.duration);
}

export default function* rootSaga() {
    yield takeEvery(UTILITY_DELAY, delayTask);
}
