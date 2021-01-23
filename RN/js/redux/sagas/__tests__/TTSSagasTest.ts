import ttsSagas, {
    sayText,
    setLocale,
    setPitch,
    setRate,
    initialize,
    resetDefaults,
} from 'src/redux/sagas/TTSSagas';
import {mocked} from 'ts-jest/utils';
import {expectSaga, testSaga} from 'redux-saga-test-plan';
import {
    TTS_INIT_REQUESTED,
    TTS_INIT_STATUS,
    TTS_RESET_REQUESTED,
    TTS_RESET_STATUS,
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
import {getAvailableLanguages} from 'src/redux/selectors/TTSSelectors';
import {
    getDefaultLanguage,
    getDefaultSpeechPitch,
    getDefaultSpeechRate,
} from 'src/redux/selectors/TaskSelectors';

import TTSService from 'types/TTSType';
import {RequestStates} from 'types/StateTypes';
import {TTSInitPayload} from 'types/TTSActionTypes';

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
                .takeLatest(TTS_SET_PITCH_REQUESTED, setPitch)
                .next()
                .takeLatest(TTS_RESET_REQUESTED, resetDefaults)
                .next()
                .isDone();
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
            let mockLocale = 'en-US';
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
                    select({selector}, next) {
                        if (selector === getAvailableLanguages) {
                            return [mockLocale];
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
            let mockLocale = 'en-US';
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
                    select({selector}, next) {
                        if (selector === getAvailableLanguages) {
                            return [mockLocale];
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

        it('should fail if the locale is not available', () => {
            let mockLocale = 'en-US';
            let mockAction = {
                type: TTS_SET_LOCALE_REQUESTED,
                payload: {
                    locale: mockLocale,
                },
            };
            let error = new Error('Language / Locale not availabe');
            return expectSaga(setLocale, mockAction)
                .provide({
                    getContext(key, next) {
                        if (key === TTS_SERVICE_KEY) {
                            return mockTTSService;
                        }
                        return next();
                    },
                    select({selector}, next) {
                        if (selector === getAvailableLanguages) {
                            return [];
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

        describe('initialize', () => {
            it('should handle successful initialize', () => {
                const mockPayload: TTSInitPayload = {
                    availableLanguages: ['en-US'],
                };
                mocked(mockTTSService).initialize.mockResolvedValue(
                    mockPayload,
                );
                return expectSaga(initialize)
                    .provide({
                        getContext(key, next) {
                            if (key === TTS_SERVICE_KEY) {
                                return mockTTSService;
                            }
                            return next();
                        },
                    })
                    .put({
                        type: TTS_INIT_STATUS,
                        payload: {
                            status: RequestStates.STARTED,
                        },
                    })
                    .put({
                        type: TTS_INIT_STATUS,
                        payload: {
                            status: RequestStates.SUCCESSFUL,
                            result: mockPayload,
                        },
                    })
                    .run();
            });

            it('should handle failed init', () => {
                let error = new Error('my error');
                mocked(mockTTSService).initialize.mockRejectedValue(error);
                return expectSaga(initialize)
                    .provide({
                        getContext(key, next) {
                            if (key === TTS_SERVICE_KEY) {
                                return mockTTSService;
                            }
                            return next();
                        },
                    })
                    .put({
                        type: TTS_INIT_STATUS,
                        payload: {
                            status: RequestStates.STARTED,
                        },
                    })
                    .put({
                        type: TTS_INIT_STATUS,
                        payload: {
                            status: RequestStates.FAILED,
                            error,
                        },
                    })
                    .run();
            });
        });

        describe('reset defaults', () => {
            it('should handle successful reset', () => {
                let mockRate = 1;
                let mockPitch = 1;
                let mockLocale = 'en-US';
                let mockRateAction = {
                    type: TTS_SET_RATE_REQUESTED,
                    payload: {
                        rate: mockRate,
                    },
                };
                let mockPitchAction = {
                    type: TTS_SET_PITCH_REQUESTED,
                    payload: {
                        pitch: mockPitch,
                    },
                };
                let mockLocaleActions = {
                    type: TTS_SET_LOCALE_REQUESTED,
                    payload: {
                        locale: mockLocale,
                    },
                };
                mocked(mockTTSService).stop.mockResolvedValue(1);
                mocked(mockTTSService).setDefaultLanguage.mockResolvedValue(1);
                mocked(mockTTSService).setDefaultPitch.mockResolvedValue(1);
                mocked(mockTTSService).setDefaultRate.mockResolvedValue(1);
                return expectSaga(resetDefaults)
                    .provide({
                        getContext(key, next) {
                            if (key === TTS_SERVICE_KEY) {
                                return mockTTSService;
                            }
                            return next();
                        },
                        select({selector}, next) {
                            if (selector === getAvailableLanguages) {
                                return [mockLocale];
                            } else if (selector === getDefaultLanguage) {
                                return mockLocale;
                            } else if (selector === getDefaultSpeechPitch) {
                                return mockPitch;
                            } else if (selector === getDefaultSpeechRate) {
                                return mockPitch;
                            }
                            return next();
                        },
                    })
                    .put({
                        type: TTS_RESET_STATUS,
                        payload: {
                            status: RequestStates.STARTED,
                        },
                    })
                    .call(mockTTSService.stop)
                    .call(setLocale, mockLocaleActions)
                    .call(setPitch, mockPitchAction)
                    .call(setRate, mockRateAction)
                    .put({
                        type: TTS_RESET_STATUS,
                        payload: {
                            status: RequestStates.SUCCESSFUL,
                        },
                    })
                    .run();
            });

            it('should handle failed reset', () => {
                const error = new Error('error');
                mocked(mockTTSService).stop.mockRejectedValue(error);
                return expectSaga(resetDefaults)
                    .provide({
                        getContext(key, next) {
                            if (key === TTS_SERVICE_KEY) {
                                return mockTTSService;
                            }
                            return next();
                        },
                    })
                    .put({
                        type: TTS_RESET_STATUS,
                        payload: {
                            status: RequestStates.STARTED,
                        },
                    })
                    .call(mockTTSService.stop)
                    .put({
                        type: TTS_RESET_STATUS,
                        payload: {
                            status: RequestStates.FAILED,
                            error,
                        },
                    })
                    .run();
            });
        });
    });
});
