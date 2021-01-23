import * as actions from 'src/redux/actions/TTSActions';
import * as types from 'src/constants/Actions';

import {RequestStates} from 'types/StateTypes';
import {TTSInitPayload} from 'types/TTSActionTypes';

describe('TTSActions', () => {
    describe('Init actions', () => {
        it('should create an action to request init', () => {
            let expectedAction = {
                type: types.TTS_INIT_REQUESTED,
            };
            expect(actions.initialize()).toEqual(expectedAction);
        });

        it('should create an action to start Init', () => {
            let expectedAction = {
                type: types.TTS_INIT_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(actions.initializeStarted()).toEqual(expectedAction);
        });

        it('should create an action to complete init', () => {
            let mockPayload: TTSInitPayload = {
                availableLanguages: ['en-US'],
            };
            let expectedAction = {
                type: types.TTS_INIT_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    result: mockPayload,
                },
            };
            expect(actions.initializeSucceeded(mockPayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to fail init', () => {
            let error = Error('some error message');
            let expectedAction = {
                type: types.TTS_INIT_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(actions.initializeFailed(error)).toEqual(expectedAction);
        });
    });

    describe('Say Actions', () => {
        let mockText = 'some text';
        let mockTextPayload = {
            text: mockText,
        };

        it('should create an action to request say text', () => {
            let expectedAction = {
                type: types.TTS_SAY_TEXT_REQUESTED,
                payload: {
                    text: mockText,
                },
            };
            expect(actions.sayText(mockText)).toEqual(expectedAction);
        });

        it('should create an action to start saying text', () => {
            let expectedAction = {
                type: types.TTS_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                    params: mockTextPayload,
                },
            };
            expect(actions.sayTextStarted(mockTextPayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to complete saying text', () => {
            let expectedAction = {
                type: types.TTS_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    params: mockTextPayload,
                },
            };
            expect(actions.sayTextSucceeded(mockTextPayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to fail saying text', () => {
            let error = Error('some error message');
            let expectedAction = {
                type: types.TTS_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    params: mockTextPayload,
                    error,
                },
            };
            expect(actions.sayTextFailed(mockTextPayload, error)).toEqual(
                expectedAction,
            );
        });
    });

    describe('Rate Actions', () => {
        let mockRate = 1;
        let mockRatePayload = {
            rate: mockRate,
        };

        it('should create an action to request rate change', () => {
            let expectedAction = {
                type: types.TTS_SET_RATE_REQUESTED,
                payload: {
                    rate: mockRate,
                },
            };
            expect(actions.setSpeechRate(mockRate)).toEqual(expectedAction);
        });

        it('should create an action to start rate change', () => {
            let expectedAction = {
                type: types.TTS_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                    params: mockRatePayload,
                },
            };
            expect(actions.setRateStarted(mockRatePayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to complete rate change', () => {
            const expectedAction = {
                type: types.TTS_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    params: mockRatePayload,
                },
            };
            expect(actions.setRateSucceeded(mockRatePayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to fail rate change', () => {
            let error = Error('some error message');
            const expectedAction = {
                type: types.TTS_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    params: mockRatePayload,
                    error,
                },
            };
            expect(actions.setRateFailed(mockRatePayload, error)).toEqual(
                expectedAction,
            );
        });
    });

    describe('Pitch Actions', () => {
        let mockPitch = 1;
        let mockPitchPayload = {
            pitch: mockPitch,
        };

        it('should create an action to request pitch change', () => {
            const expectedAction = {
                type: types.TTS_SET_PITCH_REQUESTED,
                payload: {
                    pitch: mockPitch,
                },
            };
            expect(actions.setSpeechPitch(mockPitch)).toEqual(expectedAction);
        });

        it('should create an action to start pitch change', () => {
            const expectedAction = {
                type: types.TTS_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                    params: mockPitchPayload,
                },
            };
            expect(actions.setPitchStarted(mockPitchPayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to complete pitch change', () => {
            const expectedAction = {
                type: types.TTS_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    params: mockPitchPayload,
                },
            };
            expect(actions.setPitchSucceeded(mockPitchPayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to fail pitch change', () => {
            let error = Error('some error message');
            const expectedAction = {
                type: types.TTS_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    params: mockPitchPayload,
                    error,
                },
            };
            expect(actions.setPitchFailed(mockPitchPayload, error)).toEqual(
                expectedAction,
            );
        });
    });

    describe('Locale Actions', () => {
        let mockLocale = 'locale';
        let mockLocalePayload = {
            locale: mockLocale,
        };

        it('should create an action to request locale change', () => {
            const expectedAction = {
                type: types.TTS_SET_LOCALE_REQUESTED,
                payload: {
                    locale: mockLocale,
                },
            };
            expect(actions.setSpeechLocale(mockLocale)).toEqual(expectedAction);
        });

        it('should create an action to start locale change', () => {
            const expectedAction = {
                type: types.TTS_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                    params: mockLocalePayload,
                },
            };
            expect(actions.setLocaleStarted(mockLocalePayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to complete locale change', () => {
            const expectedAction = {
                type: types.TTS_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                    params: mockLocalePayload,
                },
            };
            expect(actions.setLocaleSucceeded(mockLocalePayload)).toEqual(
                expectedAction,
            );
        });

        it('should create an action to fail locale change', () => {
            let error = Error('some error message');
            const expectedAction = {
                type: types.TTS_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    params: mockLocalePayload,
                    error,
                },
            };
            expect(actions.setLocaleFailed(mockLocalePayload, error)).toEqual(
                expectedAction,
            );
        });
    });

    describe('Reset Actions', () => {
        it('should create an action to request reset', () => {
            let expectedAction = {
                type: types.TTS_RESET_REQUESTED,
            };
            expect(actions.reset()).toEqual(expectedAction);
        });

        it('should create an action to start reset', () => {
            let expectedAction = {
                type: types.TTS_RESET_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(actions.resetStarted()).toEqual(expectedAction);
        });

        it('should create an action to complete reset', () => {
            let expectedAction = {
                type: types.TTS_RESET_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            expect(actions.resetSuccess()).toEqual(expectedAction);
        });

        it('should create an action to fail reset', () => {
            let error = Error('some error message');
            let expectedAction = {
                type: types.TTS_RESET_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(actions.resetFailed(error)).toEqual(expectedAction);
        });
    });
});
