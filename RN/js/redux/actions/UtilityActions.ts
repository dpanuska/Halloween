import {UTILITY_DELAY} from 'src/constants/Actions';
import {DelayAction} from 'src/types/UtilityActionTypes';

export const delay = (duration: number): DelayAction => ({
    type: UTILITY_DELAY,
    payload: {
        duration,
    },
});
