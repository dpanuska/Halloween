import * as actions from '../../actions/SpeechActions';
import * as types from '../../constants/Actions';
import {RequestStates} from '../../types/StateTypes';

describe('SpeechActions', () => {
    describe('Say Actions', () => {
        it('should create an action to request say text', () => {
            let text = 'something to say';
            let expectedAction = {
                type: types.SPEECH_SAY_TEXT_REQUESTED,
                payload: {
                    text,
                },
            };
            expect(actions.sayText(text)).toEqual(expectedAction);
        });

        it('should create an action to start saying text', () => {
            let expectedAction = {
                type: types.SPEECH_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(actions.sayTextStarted()).toEqual(expectedAction);
        });

        it('should create an action to complete saying text', () => {
            let expectedAction = {
                type: types.SPEECH_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            expect(actions.sayTextSucceeded()).toEqual(expectedAction);
        });

        it('should create an action to fail saying text', () => {
            let error = Error('some error message');
            let expectedAction = {
                type: types.SPEECH_SAY_TEXT_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(actions.sayTextFailed(error)).toEqual(expectedAction);
        });
    });

    describe('Rate Actions', () => {
        it('should create an action to request rate change', () => {
            let rate = 0.5;
            let expectedAction = {
                type: types.SPEECH_SET_RATE_REQUESTED,
                payload: {
                    rate,
                },
            };
            expect(actions.setSpeechRate(rate)).toEqual(expectedAction);
        });

        it('should create an action to start rate change', () => {
            let expectedAction = {
                type: types.SPEECH_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(actions.setRateStarted()).toEqual(expectedAction);
        });

        it('should create an action to complete rate change', () => {
            const expectedAction = {
                type: types.SPEECH_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            expect(actions.setRateSucceeded()).toEqual(expectedAction);
        });

        it('should create an action to fail rate change', () => {
            let error = Error('some error message');
            const expectedAction = {
                type: types.SPEECH_SET_RATE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(actions.setRateFailed(error)).toEqual(expectedAction);
        });
    });

    describe('Pitch Actions', () => {
        it('should create an action to request pitch change', () => {
            let pitch = 0.5;
            const expectedAction = {
                type: types.SPEECH_SET_PITCH_REQUESTED,
                payload: {
                    pitch,
                },
            };
            expect(actions.setSpeechPitch(pitch)).toEqual(expectedAction);
        });

        it('should create an action to start pitch change', () => {
            const expectedAction = {
                type: types.SPEECH_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(actions.setPitchStarted()).toEqual(expectedAction);
        });

        it('should create an action to complete pitch change', () => {
            const expectedAction = {
                type: types.SPEECH_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            expect(actions.setPitchSucceeded()).toEqual(expectedAction);
        });

        it('should create an action to fail pitch change', () => {
            let error = Error('some error message');
            const expectedAction = {
                type: types.SPEECH_SET_PITCH_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(actions.setPitchFailed(error)).toEqual(expectedAction);
        });
    });

    describe('Locale Actions', () => {
        it('should create an action to request locale change', () => {
            let locale = 'US';
            const expectedAction = {
                type: types.SPEECH_SET_LOCALE_REQUESTED,
                payload: {
                    locale,
                },
            };
            expect(actions.setSpeechLocale(locale)).toEqual(expectedAction);
        });

        it('should create an action to start locale change', () => {
            const expectedAction = {
                type: types.SPEECH_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.STARTED,
                },
            };
            expect(actions.setLocaleStarted()).toEqual(expectedAction);
        });

        it('should create an action to complete locale change', () => {
            const expectedAction = {
                type: types.SPEECH_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.SUCCESSFUL,
                },
            };
            expect(actions.setLocaleSucceeded()).toEqual(expectedAction);
        });

        it('should create an action to fail locale change', () => {
            let error = Error('some error message');
            const expectedAction = {
                type: types.SPEECH_SET_LOCALE_STATUS,
                payload: {
                    status: RequestStates.FAILED,
                    error,
                },
            };
            expect(actions.setLocaleFailed(error)).toEqual(expectedAction);
        });
    });
});
