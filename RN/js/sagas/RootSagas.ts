import {put, spawn} from 'redux-saga/effects';
import {inializeServices} from '../actions/AppActions';
import appSagas from './AppSagas';
import ttsSagas from './TTSSagas';
import cameraSagas from './CameraSagas';
import taskSagas from './TaskSagas';

export default function* rootSaga() {
    yield spawn(appSagas);
    yield spawn(ttsSagas);
    yield spawn(cameraSagas);
    yield spawn(taskSagas);
    yield put(inializeServices());
}
