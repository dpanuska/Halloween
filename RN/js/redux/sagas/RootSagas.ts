import {spawn} from 'redux-saga/effects';
import appSagas from 'src/redux/sagas/AppSagas';
import ttsSagas from 'src/redux/sagas/TTSSagas';
import cameraSagas from 'src/redux/sagas/CameraSagas';
import taskSagas from 'src/redux/sagas/TaskSagas';
import voiceSagas from 'src/redux/sagas/VoiceRecognitionSagas';

export default function* rootSaga() {
    yield spawn(appSagas);
    yield spawn(ttsSagas);
    yield spawn(cameraSagas);
    yield spawn(taskSagas);
    yield spawn(voiceSagas);
}
