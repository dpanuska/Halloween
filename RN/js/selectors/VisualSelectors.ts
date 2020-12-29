import {AllState, VisualState} from '../types/StateTypes';

export const getVisualState = (state: AllState): VisualState => state.visual;

export const getBackgroundFile = (state: AllState): string | null =>
  getVisualState(state).backgroundFile;

export const getText = (state: AllState): string | null =>
  getVisualState(state).text;
