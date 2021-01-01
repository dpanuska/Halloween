import speechReducer from '../../reducers/TTSReducer';
import {
    TTS_SAY_TEXT_STATUS,
    TTS_SET_RATE_STATUS,
    TTS_SET_PITCH_STATUS,
    TTS_SET_LOCALE_STATUS,
} from '../../constants/Actions';
import {SpeechState, RequestStates} from '../../types/StateTypes';

let initialState: SpeechState = {
    isSpeaking: false,
    isSettingRate: false,
    isSettingPitch: false,
    isSettingLocale: false,
};

describe('TTSReducer', () => {
    it('should return initial state', () => {
        expect(speechReducer(initialState, {type: 'INVALID'})).toEqual(
            initialState,
        );
    });

    describe('Say Actions', () => {
        it('should handle SPEECH_SAY_TEXT_STATUS STARTED', () => {
            let action = {
                type: TTS_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                isSpeaking: true,
            };
            expect(speechReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SAY_TEXT_STATUS SUCCESSFUL', () => {
            let testState = {
                ...initialState,
                isSpeaking: true,
            };
            let action = {
                type: TTS_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            let expectedState = {
                ...initialState,
                isSpeaking: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SAY_TEXT_STATUS FAILED', () => {
            let testState = {
                ...initialState,
                isSpeaking: true,
            };
            let error = new Error('some error');
            let action = {
                type: TTS_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                isSpeaking: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });
    });

    describe('Rate Actions', () => {
        it('should handle SPEECH_SET_RATE_STATUS STARTED', () => {
            let action = {
                type: TTS_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingRate: true,
            };
            expect(speechReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SET_RATE_STATUS SUCCESSFUL', () => {
            let testState = {
                ...initialState,
                isSettingRate: true,
            };
            let action = {
                type: TTS_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingRate: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SET_RATE_STATUS FAILED', () => {
            let testState = {
                ...initialState,
                isSettingRate: true,
            };
            let error = new Error('some error');
            let action = {
                type: TTS_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingRate: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });
    });

    describe('Pitch Actions', () => {
        it('should handle SPEECH_SET_PITCH_STATUS STARTED', () => {
            let action = {
                type: TTS_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingPitch: true,
            };
            expect(speechReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SET_PITCH_STATUS SUCCESSFUL', () => {
            let testState = {
                ...initialState,
                isSettingPitch: true,
            };
            let action = {
                type: TTS_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingPitch: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SET_PITCH_STATUS FAILED', () => {
            let testState = {
                ...initialState,
                isSettingPitch: true,
            };
            let error = new Error('some error');
            let action = {
                type: TTS_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingPitch: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });
    });

    describe('Locale Actions', () => {
        it('should handle SPEECH_SET_LOCALE_STATUS STARTED', () => {
            let action = {
                type: TTS_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingLocale: true,
            };
            expect(speechReducer(initialState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SET_LOCALE_STATUS SUCCESSFUL', () => {
            let testState = {
                ...initialState,
                isSettingLocale: true,
            };
            let action = {
                type: TTS_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingLocale: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });

        it('should handle SPEECH_SET_LOCALE_STATUS FAILED', () => {
            let testState = {
                ...initialState,
                isSettingLocale: true,
            };
            let error = new Error('some error');
            let action = {
                type: TTS_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            let expectedState = {
                ...initialState,
                isSettingLocale: false,
            };
            expect(speechReducer(testState, action)).toEqual(expectedState);
        });
    });
});
