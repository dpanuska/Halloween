jest.mock('src/redux/sagas/AppSagas');
jest.mock('src/redux/sagas/TTSSagas');
jest.mock('src/redux/sagas/CameraSagas');
jest.mock('src/redux/sagas/TaskSagas');
jest.mock('src/services/FileService');

import {testSaga} from 'redux-saga-test-plan';
import rootSagas from 'src/redux/sagas/RootSagas';
import appSagas from 'src/redux/sagas/AppSagas';
import ttsSagas from 'src/redux/sagas/TTSSagas';
import cameraSagas from 'src/redux/sagas/CameraSagas';
import taskSagas from 'src/redux/sagas/TaskSagas';

describe('RootSagas', () => {
    it('should spawn all sagas', () => {
        testSaga(rootSagas)
            .next()
            .spawn(appSagas)
            .next()
            .spawn(ttsSagas)
            .next()
            .spawn(cameraSagas)
            .next()
            .spawn(taskSagas);
    });
});
