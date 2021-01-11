import ttsSagas, {
    sayText,
    setLocale,
    setPitch,
    setRate,
} from 'src/sagas/TTSSagas';
import {mocked} from 'ts-jest/utils';
import {expectSaga, testSaga} from 'redux-saga-test-plan';
import {
    TTS_SAY_TEXT_REQUESTED,
    TTS_SAY_TEXT_STATUS,
    TTS_SET_LOCALE_REQUESTED,
    TTS_SET_LOCALE_STATUS,
    TTS_SET_PITCH_REQUESTED,
    TTS_SET_PITCH_STATUS,
    TTS_SET_RATE_REQUESTED,
    TTS_SET_RATE_STATUS,
} from 'src/constants/Actions';
import {TTS_SERVICE_KEY} from 'src/constants/ContextEffects';

import TTSService from 'src/types/TTSType';
import {RequestStates} from 'src/types/StateTypes';

let mockTTSService: TTSService = {
    speak: jest.fn(),
    setDefaultLanguage: jest.fn(),
    setDefaultPitch: jest.fn(),
    setDefaultRate: jest.fn(),
};

describe('TTSSagas', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('root saga', () => {
        it('should takeLatest on all TTS action requrests', () => {
            testSaga(ttsSagas)
                .next()
                .takeLatest(TTS_SAY_TEXT_REQUESTED, sayText)
                .next()
                .takeLatest(TTS_SET_LOCALE_REQUESTED, setLocale)
                .next()
                .takeLatest(TTS_SET_RATE_REQUESTED, setRate)
                .next()
                .takeLatest(TTS_SET_PITCH_REQUESTED, setPitch);
        });

        it('should handle successful say text request', () => {
            let mockText = 'something to say';
            mocked(mockTTSService).speak.mockResolvedValue(1);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SAY_TEXT_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SAY_TEXT_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                    },
                })
                .dispatch({
                    type: TTS_SAY_TEXT_REQUESTED,
                    payload: {
                        text: mockText,
                    },
                })
                .silentRun();
        });

        it('should handle failed say text request', () => {
            let mockText = 'something to say';
            let error = new Error('my error');
            mocked(mockTTSService).speak.mockRejectedValue(error);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SAY_TEXT_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SAY_TEXT_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error,
                    },
                })
                .dispatch({
                    type: TTS_SAY_TEXT_REQUESTED,
                    payload: {
                        text: mockText,
                    },
                })
                .silentRun();
        });

        it('should handle successful set locale request', () => {
            let mockLocale = 'US';
            mocked(mockTTSService).setDefaultLanguage.mockResolvedValue(1);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SET_LOCALE_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SET_LOCALE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                    },
                })
                .dispatch({
                    type: TTS_SET_LOCALE_REQUESTED,
                    payload: {
                        locale: mockLocale,
                    },
                })
                .silentRun();
        });

        it('should handle failed set locale request', () => {
            let mockLocale = 'US';
            let error = new Error('my error');
            mocked(mockTTSService).setDefaultLanguage.mockRejectedValue(error);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SET_LOCALE_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SET_LOCALE_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error,
                    },
                })
                .dispatch({
                    type: TTS_SET_LOCALE_REQUESTED,
                    payload: {
                        locale: mockLocale,
                    },
                })
                .silentRun();
        });

        it('should handle successful set pitchrequest', () => {
            let mockPitch = 1;
            mocked(mockTTSService).setDefaultPitch.mockResolvedValue(1);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SET_PITCH_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SET_PITCH_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                    },
                })
                .dispatch({
                    type: TTS_SET_PITCH_REQUESTED,
                    payload: {
                        pitch: mockPitch,
                    },
                })
                .silentRun();
        });

        it('should handle failed set pitch request', () => {
            let mockPitch = 1;
            let error = new Error('my error');
            mocked(mockTTSService).setDefaultPitch.mockRejectedValue(error);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SET_PITCH_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SET_PITCH_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error,
                    },
                })
                .dispatch({
                    type: TTS_SET_PITCH_REQUESTED,
                    payload: {
                        pitch: mockPitch,
                    },
                })
                .silentRun();
        });

        it('should handle successful set rate request', () => {
            let mockRate = 1;
            mocked(mockTTSService).setDefaultRate.mockResolvedValue(1);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SET_RATE_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SET_RATE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                    },
                })
                .dispatch({
                    type: TTS_SET_RATE_REQUESTED,
                    payload: {
                        rate: mockRate,
                    },
                })
                .silentRun();
        });

        it('should handle failed set rate request', () => {
            let mockRate = 1;
            let error = new Error('my error');
            mocked(mockTTSService).setDefaultRate.mockRejectedValue(error);
            return expectSaga(ttsSagas)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                })
                .put({
                    type: TTS_SET_RATE_STATUS,
                    payload: {
                        status: RequestStates.STARTED,
                    },
                })
                .put({
                    type: TTS_SET_RATE_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        error,
                    },
                })
                .dispatch({
                    type: TTS_SET_RATE_REQUESTED,
                    payload: {
                        rate: mockRate,
                    },
                })
                .silentRun();
        });
    });

    describe('sayText', () => {});
    describe('setLocale', () => {});
    describe('setPitch', () => {});
    describe('setRate', () => {});
});
