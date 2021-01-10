import {spawn} from 'redux-saga/effects';
import appSagas from 'src/sagas/AppSagas';
import ttsSagas from 'src/sagas/TTSSagas';
import cameraSagas from 'src/sagas/CameraSagas';
import taskSagas from 'src/sagas/TaskSagas';

export default function* rootSaga() {
    yield spawn(appSagas);
    yield spawn(ttsSagas);
    yield spawn(cameraSagas);
    yield spawn(taskSagas);
}
