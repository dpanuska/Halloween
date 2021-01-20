import {
    VISUAL_SET_BACKGROUND_RESOURCE,
    VISUAL_RESET,
    VISUAL_SET_TEXT,
    VISUAL_SET_BACKGROUND_IMAGE,
} from 'src/constants/Actions';
import {createReducer} from '@reduxjs/toolkit';

import {VisualState} from 'types/StateTypes';
import {
    SetBackgroundImageAction,
    SetBackgroundResourceAction,
    SetTextAction,
} from 'types/VisualActionTypes';

const initialState: VisualState = {
    backgroundResource: null,
    backgroundImage: null,
    text: null,
};

function setBackgroundResource(
    state: VisualState,
    action: SetBackgroundResourceAction,
): VisualState {
    let {resource} = action.payload;
    return {
        ...state,
        backgroundResource: resource,
    };
}

function setBackgroundImage(
    state: VisualState,
    action: SetBackgroundImageAction,
): VisualState {
    return {
        ...state,
        backgroundImage: action.payload,
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
    return {
        ...initialState,
    };
}

const reducer = createReducer(initialState, {
    [VISUAL_SET_BACKGROUND_RESOURCE]: (
        state: VisualState,
        action: SetBackgroundResourceAction,
    ) => setBackgroundResource(state, action),
    [VISUAL_SET_BACKGROUND_IMAGE]: (
        state: VisualState,
        action: SetBackgroundImageAction,
    ) => setBackgroundImage(state, action),
    [VISUAL_SET_TEXT]: (state: VisualState, action: SetTextAction) =>
        setVisualText(state, action),
    [VISUAL_RESET]: () => resetVisuals(),
});

export default reducer;
