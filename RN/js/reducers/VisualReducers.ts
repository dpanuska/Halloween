import {
  VISUAL_SET_BACKGROUND_FILE,
  VISUAL_RESET,
  VISUAL_SET_TEXT,
} from '../constants/ActionTypes';
import {createReducer} from '@reduxjs/toolkit';

import {VisualState} from '../types/StateTypes';

const initialState: VisualState = {
  backgroundFile: null,
  text: null,
};

function setBackgroundFile(state: VisualState, action): VisualState {
  let {filePath} = action.payload;
  return {
    ...state,
    backgroundFile: filePath,
  };
}

function setVisualText(state: VisualState, action): VisualState {
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
  [VISUAL_SET_BACKGROUND_FILE]: (state: VisualState, action: any) =>
    setBackgroundFile(state, action),
  [VISUAL_SET_TEXT]: (state: VisualState, action: any) =>
    setVisualText(state, action),
  [VISUAL_RESET]: () => resetVisuals(),
});

export default reducer;
