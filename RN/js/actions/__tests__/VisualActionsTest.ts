import {
    VISUAL_RESET,
    VISUAL_SET_BACKGROUND_FILE,
    VISUAL_SET_TEXT,
} from '../../constants/Actions';
import {resetVisuals, setBackgroundFile, setText} from '../VisualActions';

describe('VisualActions', () => {
    it('should create an action to reset visual state', () => {
        let expectedAction = {
            type: VISUAL_RESET,
        };
        expect(resetVisuals()).toEqual(expectedAction);
    });

    it('should create an action to set background file', () => {
        let filePath = 'someFile';
        let expectedAction = {
            type: VISUAL_SET_BACKGROUND_FILE,
            payload: {
                filePath,
            },
        };
        expect(setBackgroundFile(filePath)).toEqual(expectedAction);
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
