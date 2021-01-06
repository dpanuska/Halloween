import {expectSaga, testSaga} from 'redux-saga-test-plan';
import appSaga, {
    initialize,
    objectDetectionFlow,
    objectDetectionSet,
} from '../AppSagas';
import {APP_INITIALIZE_SERVICES, APP_SET_CONFIGURATION} from '../../constants/Actions';
import appConfig from '../../res/config';

describe('AppSagas', () => {
    it('Waits for initialization then object detection saga', () => {
        const action = {type: APP_INITIALIZE_SERVICES};
        testSaga(appSaga)
            .next()
            .take(APP_INITIALIZE_SERVICES)
            .next(action)
            .call(initialize)
            .next()
            .fork(objectDetectionFlow);
    });

    describe('initialize', () => {
        it('Sets app configuration', () => {
            let action = {
                type: APP_SET_CONFIGURATION,
                payload: appConfig,
            };
            testSaga(initialize).next().put(action);
        });
    });

    // TODO
    describe('objectDetectionFlow', () => {});
});
