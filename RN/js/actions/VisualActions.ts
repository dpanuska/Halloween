import {
  VISUAL_RESET,
  VISUAL_SET_BACKGROUND_FILE,
  VISUAL_SET_TEXT,
} from '../constants/Actions';
import {
  SetBackgroundAction,
  SetTextAction,
  ResetVisualAction,
} from '../types/VisualActionTypes';

export const resetVisuals = (): ResetVisualAction => ({
  type: VISUAL_RESET,
});

export const setBackgroundFile = (filePath: string): SetBackgroundAction => ({
  type: VISUAL_SET_BACKGROUND_FILE,
  payload: {
    filePath,
  },
});

export const displayText = (text: string): SetTextAction => ({
  type: VISUAL_SET_TEXT,
  payload: {
    text,
  },
});
