import {
  VISUAL_RESET,
  VISUAL_SET_BACKGROUND_FILE,
  VISUAL_SET_TEXT,
} from '../constants/ActionTypes';

export const resetVisuals = () => ({
  type: VISUAL_RESET,
  payload: {},
});

export const setBackgroundFile = (filePath: string) => ({
  type: VISUAL_SET_BACKGROUND_FILE,
  payload: {
    filePath,
  },
});

export const displayText = (text: string) => ({
  type: VISUAL_SET_TEXT,
  payload: {
    text,
  },
});
