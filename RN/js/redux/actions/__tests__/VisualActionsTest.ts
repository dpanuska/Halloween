import {
    VISUAL_RESET,
    VISUAL_SET_BACKGROUND_RESOURCE,
    VISUAL_SET_TEXT,
} from 'src/constants/Actions';
import {
    resetVisuals,
    setBackgroundResource,
    setText,
} from 'src/redux/actions/VisualActions';

describe('VisualActions', () => {
    it('should create an action to reset visual state', () => {
        let expectedAction = {
            type: VISUAL_RESET,
        };
        expect(resetVisuals()).toEqual(expectedAction);
    });

    it('should create an action to set background resource', () => {
        let resource = 'some resouce';
        let expectedAction = {
            type: VISUAL_SET_BACKGROUND_RESOURCE,
            payload: {
                resource,
            },
        };
        expect(setBackgroundResource(resource)).toEqual(expectedAction);
    });

    it('should create an action to set text', () => {
        let text = 'some text';
        let expectedAction = {
            type: VISUAL_SET_TEXT,
            payload: {
                text,
            },
        };
        expect(setText(text)).toEqual(expectedAction);
    });
});
