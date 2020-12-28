import {
  VISUAL_BACKGROUND,
  VISUAL_BACKGROUND_FILE,
  VISUAL_RESET,
  VISUAL_TEXT,
} from '../constants/ActionTypes';
import {createReducer} from '@reduxjs/toolkit';
import {Image} from 'react-native';

interface State {
  backgroundImage: Image | null;
  backgroundFile: string | null;
  text: string | null;
}

const initialState: State = {
  backgroundImage: null,
  backgroundFile: null,
  text: null,
};

function setBackgroundFile(state: State, action): State {
  let {filePath} = action.payload;
  return {
    ...state,
    backgroundFile: filePath,
  };
}

function setBackgroundImage(state: State, action): State {
  let {image} = action.payload;
  return {
    ...state,
    backgroundImage: image,
  };
}

function setVisualText(state: State, action): State {
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
  VISUAL_BACKGROUND: setBackgroundImage,
  VISUAL_BACKGROUND_FILE: setBackgroundFile,
  VISUAL_TEXT: setVisualText,
  VISUAL_RESET: resetVisuals,
});

export default reducer;
