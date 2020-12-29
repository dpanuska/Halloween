import {APP_SET_DETECTION_STATE} from '../constants/ActionTypes';
import {DetectionState} from '../types/StateTypes';

export const setDetectionState = (detectionState: DetectionState) => ({
  type: APP_SET_DETECTION_STATE,
  payload: {
    detectionState,
  },
});
