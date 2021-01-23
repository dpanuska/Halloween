import {delay, takeEvery} from 'redux-saga/effects';
import {UTILITY_DELAY} from 'src/constants/Actions';
import {DelayAction} from 'types/UtilityActionTypes';

export function* delayTask(action: DelayAction) {
    yield delay(action.payload.duration * 1000);
}

export default function* rootSaga() {
    yield takeEvery(UTILITY_DELAY, delayTask);
}
