import {expectSaga, testSaga} from 'redux-saga-test-plan';
import rootSaga from '../RootSagas';
import appSagas from '../AppSagas';
import ttsSagas from '../TTSSagas';
import cameraSagas from '../CameraSagas';
import taskSagas from '../TaskSagas';
import {APP_INITIALIZE_SERVICES} from '../../constants/Actions';

describe('RootSagas', () => {
    it('is empty right now', () => {});
    // it('should spawn all root sagas and dispatch initialize action', () => {
    //     expectSaga(rootSaga)
    //         .spawn(appSagas)
    //         .spawn(ttsSagas)
    //         .spawn(cameraSagas)
    //         .spawn(taskSagas)
    //         .put({type: APP_INITIALIZE_SERVICES});
    // });
});
