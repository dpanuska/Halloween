import {RootState, VisualState} from '../types/StateTypes';
import images from 'res/images';
// TODO use createSelector for calculated state
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

export const getBackgroundResource = (state: RootState): any | null => {
    let fileName = getBackgroundFile(state);
    if (fileName == null) {
        return null;
    }
    return imageMap[fileName];
};

export const getText = (state: RootState): string | null =>
    getVisualState(state).text;
