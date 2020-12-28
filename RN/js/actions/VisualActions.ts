import {
  VISUAL_RESET,
  VISUAL_BACKGROUND,
  VISUAL_BACKGROUND_FILE,
  VISUAL_TEXT,
} from '../constants/ActionTypes';

export const resetVisuals = () => ({
  type: VISUAL_RESET,
  payload: {},
});

export const setBackgroundImage = (image: Image) => ({
  type: VISUAL_BACKGROUND,
  payload: {
    image,
  },
});

export const setBackgroundFile = (filePath: string) => ({
  type: VISUAL_BACKGROUND_FILE,
  payload: {
    filePath,
  },
});

export const displayText = (text: string) => ({
  type: VISUAL_TEXT,
  payload: {
    text,
  },
});
