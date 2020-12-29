import {APP_SET_DETECTION_STATE} from '../constants/Actions';
import {DetectionStates} from '../types/StateTypes';

import {DetectionStateAction} from '../types/AppActionTypes';

export const setDetectionState = (
  detectionState: DetectionStates,
): DetectionStateAction => ({
  type: APP_SET_DETECTION_STATE,
  payload: {
    detectionState,
  },
});
