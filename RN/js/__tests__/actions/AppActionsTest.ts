import {APP_SET_DETECTION_STATE} from '../../constants/Actions';
import {setDetectionState} from '../../actions/AppActions';
import {DetectionStates} from '../../types/StateTypes';

describe('AppActions', () => {
    it('should create an action to set detection state', () => {
        let detectionState = DetectionStates.ACTIVE;
        let expectedAction = {
            type: APP_SET_DETECTION_STATE,
            payload: {
                detectionState,
            },
        };
        expect(setDetectionState(detectionState)).toEqual(expectedAction);
    });
});
