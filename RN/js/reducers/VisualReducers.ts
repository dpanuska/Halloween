import {
    VISUAL_SET_BACKGROUND_FILE,
    VISUAL_RESET,
    VISUAL_SET_TEXT,
} from '../constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {VisualState} from '../types/StateTypes';
import {SetBackgroundAction, SetTextAction} from '../types/VisualActionTypes';

const initialState: VisualState = {
    backgroundFile: null,
    text: null,
};

function setBackgroundFile(
    state: VisualState,
    action: SetBackgroundAction,
): VisualState {
    let {filePath} = action.payload;
    return {
        ...state,
        backgroundFile: filePath,
    };
}

function setVisualText(state: VisualState, action: SetTextAction): VisualState {
    let {text} = action.payload;
    return {
        ...state,
        text,
    };
}

function resetVisuals() {
    return initialState;
}

const reducer = createReducer(initialState, {
    [VISUAL_SET_BACKGROUND_FILE]: (
        state: VisualState,
        action: SetBackgroundAction,
    ) => setBackgroundFile(state, action),
    [VISUAL_SET_TEXT]: (state: VisualState, action: SetTextAction) =>
        setVisualText(state, action),
    [VISUAL_RESET]: () => resetVisuals(),
});

export default reducer;
