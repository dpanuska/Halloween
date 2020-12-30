import appReducer from '../../reducers/AppReducer';
import {APP_SET_DETECTION_STATE} from '../../constants/Actions';
import {AppState, DetectionStates} from '../../types/StateTypes';

let initialState: AppState = {
    detectionState: DetectionStates.IDLE,
};

describe('AppReducer', () => {
    it('should return initial state', () => {
        expect(appReducer(initialState, {type: 'INVALID'})).toEqual(
            initialState,
        );
    });

    it('should handle APP_SET_DETECTION_STATE', () => {
        let action = {
            type: APP_SET_DETECTION_STATE,
            payload: {
                detectionState: DetectionStates.ACTIVE,
            },
        };
        let expectedState = {
            detectionState: DetectionStates.ACTIVE,
        };
        expect(appReducer(initialState, action)).toEqual(expectedState);
    });
});
