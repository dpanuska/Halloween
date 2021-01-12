import visualReducer from 'src/redux/reducers/VisualReducer';
import {
    VISUAL_RESET,
    VISUAL_SET_BACKGROUND_FILE,
    VISUAL_SET_TEXT,
} from 'src/constants/Actions';

import {VisualState} from 'types/StateTypes';

let initialState: VisualState = {
    backgroundFile: null,
    text: null,
};

describe('VisualReducer', () => {
    it('should return initial state', () => {
        expect(visualReducer(initialState, {type: 'INVALID'})).toEqual(
            initialState,
        );
    });

    it('should handle VISUAL_RESET', () => {
        let testState = {
            backgroundFile: 'some file',
            text: 'some text',
        };
        let action = {
            type: VISUAL_RESET,
        };
        let expectedState = initialState;
        expect(visualReducer(testState, action)).toEqual(expectedState);
    });

    it('should handle VISUAL_SET_BACKGROUND_FILE', () => {
        let filePath = 'some file';
        let action = {
            type: VISUAL_SET_BACKGROUND_FILE,
            payload: {
                filePath,
            },
        };
        let expectedState = {
            ...initialState,
            backgroundFile: filePath,
        };
        expect(visualReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle VISUAL_SET_TEXT', () => {
        let text = 'some text';
        let action = {
            type: VISUAL_SET_TEXT,
            payload: {
                text,
            },
        };
        let expectedState = {
            ...initialState,
            text,
        };
        expect(visualReducer(initialState, action)).toEqual(expectedState);
    });
});
