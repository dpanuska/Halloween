import {expectSaga, testSaga} from 'redux-saga-test-plan';
import utilitySagas, {delayTask} from 'src/redux/sagas/UtilitySagas';
import {UTILITY_DELAY} from 'src/constants/Actions';

describe('Utility Sagas', () => {
    it('should take every UTILITY_DELAY action', () => {
        testSaga(utilitySagas)
            .next()
            .takeEvery(UTILITY_DELAY, delayTask)
            .next()
            .isDone();
    });

    describe('delayTask', () => {
        it('should delay for action duration', () => {
            let duration = 1000;
            let mockAction = {
                type: UTILITY_DELAY,
                payload: {
                    duration,
                },
            };
            return expectSaga(delayTask, mockAction)
                .delay(duration * 1000)
                .silentRun();
        });
    });
});
