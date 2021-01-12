import images from 'res/images';
import {createSelector} from '@reduxjs/toolkit';

import {RootState, VisualState} from 'types/StateTypes';

interface ResourceMap {
    [key: string]: any;
}

// TODO put this somewhere else
const imageMap: ResourceMap = {
    dylan: images.dylan,
    grab_candy: images.grab_candy,
};

export const getVisualState = (state: RootState): VisualState => state.visual;

export const getBackgroundFile = (state: RootState): string | null =>
    getVisualState(state).backgroundFile;

export const getBackgroundResource = createSelector(
    getBackgroundFile,
    (backgroundFile) => {
        if (backgroundFile == null) {
            return null;
        }
        return imageMap[backgroundFile];
    },
);

export const getText = (state: RootState): string | null =>
    getVisualState(state).text;
