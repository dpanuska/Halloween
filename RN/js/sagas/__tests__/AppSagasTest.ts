import {expectSaga, testSaga} from 'redux-saga-test-plan';
import appSaga, {
    objectDetectionFlow,
    fetchAppConfig,
    objectDetectionSet,
} from '../AppSagas';
import {APP_FETCH_CONFIG_REQUESTED} from '../../constants/Actions';
import appConfig from '../../res/config';

describe('AppSagas', () => {
    it('is empty right now', () => {});
});
