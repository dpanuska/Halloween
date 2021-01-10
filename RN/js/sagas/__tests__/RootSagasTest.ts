jest.mock('src/sagas/AppSagas');
jest.mock('src/sagas/TTSSagas');
jest.mock('src/sagas/CameraSagas');
jest.mock('src/sagas/TaskSagas');

import {testSaga} from 'redux-saga-test-plan';
import rootSagas from 'src/sagas/RootSagas';
import appSagas from 'src/sagas/AppSagas';
import ttsSagas from 'src/sagas/TTSSagas';
import cameraSagas from 'src/sagas/CameraSagas';
import taskSagas from 'src/sagas/TaskSagas';

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
