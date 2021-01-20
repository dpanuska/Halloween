import {
    VISUAL_RESET,
    VISUAL_SET_BACKGROUND_IMAGE,
    VISUAL_SET_BACKGROUND_RESOURCE,
    VISUAL_SET_TEXT,
} from 'src/constants/Actions';
import {
    SetBackgroundResourceAction,
    SetTextAction,
    ResetVisualAction,
    SetBackgroundImageAction,
} from 'types/VisualActionTypes';

export const resetVisuals = (): ResetVisualAction => ({
    type: VISUAL_RESET,
});

export const setBackgroundResource = (
    resource: string,
): SetBackgroundResourceAction => ({
    type: VISUAL_SET_BACKGROUND_RESOURCE,
    payload: {
        resource,
    },
});

export const setBackgroundImage = (base64: any): SetBackgroundImageAction => ({
    type: VISUAL_SET_BACKGROUND_IMAGE,
    payload: {
        base64,
    },
});

// export const setBackgroundImage = (base64: any):

export const setText = (text: string): SetTextAction => ({
    type: VISUAL_SET_TEXT,
    payload: {
        text,
    },
});
