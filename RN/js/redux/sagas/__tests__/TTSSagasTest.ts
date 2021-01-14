import ttsSagas, {
    sayText,
    setLocale,
    setPitch,
    setRate,
    initialize,
} from 'src/redux/sagas/TTSSagas';
import {mocked} from 'ts-jest/utils';
import {expectSaga, testSaga} from 'redux-saga-test-plan';
import {
    TTS_INIT_REQUESTED,
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
    initialize: jest.fn(),
    speak: jest.fn(),
    setDefaultLanguage: jest.fn(),
    setDefaultPitch: jest.fn(),
    setDefaultRate: jest.fn(),
    stop: jest.fn(),
};

describe('TTSSagas', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('root saga', () => {
        it('should takeLatest on all TTS action requrests', () => {
            testSaga(ttsSagas)
                .next()
                .take(TTS_INIT_REQUESTED)
                .next()
                .call(initialize)
                .next()
                .takeLatest(TTS_SAY_TEXT_REQUESTED, sayText)
                .next()
                .takeLatest(TTS_SET_LOCALE_REQUESTED, setLocale)
                .next()
                .takeLatest(TTS_SET_RATE_REQUESTED, setRate)
                .next()
                .takeLatest(TTS_SET_PITCH_REQUESTED, setPitch);
        });
    });

    describe('sayText', () => {
        it('should handle successful say text request', () => {
            let mockText = 'something to say';
            let mockAction = {
                type: TTS_SAY_TEXT_REQUESTED,
                payload: {
                    text: mockText,
                },
            };
            mocked(mockTTSService).speak.mockResolvedValue(1);
            return expectSaga(sayText, mockAction)
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
                        params: {
                            text: mockText,
                        },
                    },
                })
                .put({
                    type: TTS_SAY_TEXT_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: {
                            text: mockText,
                        },
                    },
                })
                .run();
        });

        it('should handle failed say text request', () => {
            let mockText = 'something to say';
            let mockAction = {
                type: TTS_SAY_TEXT_REQUESTED,
                payload: {
                    text: mockText,
                },
            };
            let error = new Error('my error');
            mocked(mockTTSService).speak.mockRejectedValue(error);
            return expectSaga(sayText, mockAction)
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
                        params: {
                            text: mockText,
                        },
                    },
                })
                .put({
                    type: TTS_SAY_TEXT_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: {
                            text: mockText,
                        },
                        error,
                    },
                })
                .run();
        });
    });

    describe('setLocale', () => {
        it('should handle successful set locale request', () => {
            let mockLocale = 'US';
            let mockAction = {
                type: TTS_SET_LOCALE_REQUESTED,
                payload: {
                    locale: mockLocale,
                },
            };
            mocked(mockTTSService).setDefaultLanguage.mockResolvedValue(1);
            return expectSaga(setLocale, mockAction)
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
                        params: {
                            locale: mockLocale,
                        },
                    },
                })
                .put({
                    type: TTS_SET_LOCALE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: {
                            locale: mockLocale,
                        },
                    },
                })
                .run();
        });

        it('should handle failed set locale request', () => {
            let mockLocale = 'US';
            let mockAction = {
                type: TTS_SET_LOCALE_REQUESTED,
                payload: {
                    locale: mockLocale,
                },
            };
            let error = new Error('my error');
            mocked(mockTTSService).setDefaultLanguage.mockRejectedValue(error);
            return expectSaga(setLocale, mockAction)
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
                        params: {
                            locale: mockLocale,
                        },
                    },
                })
                .put({
                    type: TTS_SET_LOCALE_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: {
                            locale: mockLocale,
                        },
                        error,
                    },
                })
                .run();
        });
    });
    describe('setPitch', () => {
        it('should handle successful set pitch request', () => {
            let mockPitch = 1;
            let mockAction = {
                type: TTS_SET_PITCH_REQUESTED,
                payload: {
                    pitch: mockPitch,
                },
            };
            mocked(mockTTSService).setDefaultPitch.mockResolvedValue(1);
            return expectSaga(setPitch, mockAction)
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
                        params: {
                            pitch: mockPitch,
                        },
                    },
                })
                .put({
                    type: TTS_SET_PITCH_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: {
                            pitch: mockPitch,
                        },
                    },
                })
                .run();
        });

        it('should handle failed set pitch request', () => {
            let mockPitch = 1;
            let mockAction = {
                type: TTS_SET_PITCH_REQUESTED,
                payload: {
                    pitch: mockPitch,
                },
            };
            let error = new Error('my error');
            mocked(mockTTSService).setDefaultPitch.mockRejectedValue(error);
            return expectSaga(setPitch, mockAction)
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
                        params: {
                            pitch: mockPitch,
                        },
                    },
                })
                .put({
                    type: TTS_SET_PITCH_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: {
                            pitch: mockPitch,
                        },
                        error,
                    },
                })
                .run();
        });
    });
    describe('setRate', () => {
        it('should handle successful set rate request', () => {
            let mockRate = 1;
            let mockAction = {
                type: TTS_SET_RATE_REQUESTED,
                payload: {
                    rate: mockRate,
                },
            };
            mocked(mockTTSService).setDefaultRate.mockResolvedValue(1);
            return expectSaga(setRate, mockAction)
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
                        params: {
                            rate: mockRate,
                        },
                    },
                })
                .put({
                    type: TTS_SET_RATE_STATUS,
                    payload: {
                        status: RequestStates.SUCCESSFUL,
                        params: {
                            rate: mockRate,
                        },
                    },
                })
                .run();
        });

        it('should handle failed set rate request', () => {
            let mockRate = 1;
            let mockAction = {
                type: TTS_SET_RATE_REQUESTED,
                payload: {
                    rate: mockRate,
                },
            };
            let error = new Error('my error');
            mocked(mockTTSService).setDefaultRate.mockRejectedValue(error);
            return expectSaga(setRate, mockAction)
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
                        params: {
                            rate: mockRate,
                        },
                    },
                })
                .put({
                    type: TTS_SET_RATE_STATUS,
                    payload: {
                        status: RequestStates.FAILED,
                        params: {
                            rate: mockRate,
                        },
                        error,
                    },
                })
                .run();
        });
    });
});
