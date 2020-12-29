import {RootState, VisualState} from '../types/StateTypes';

export const getVisualState = (state: RootState): VisualState => state.visual;

export const getBackgroundFile = (state: RootState): string | null =>
  getVisualState(state).backgroundFile;

export const getText = (state: RootState): string | null =>
  getVisualState(state).text;
