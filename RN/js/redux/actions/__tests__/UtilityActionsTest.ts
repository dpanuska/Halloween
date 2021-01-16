import {UTILITY_DELAY} from 'src/constants/Actions';
import {delay} from 'src/redux/actions/UtilityActions';

describe('UtilityActions', () => {
    it('should create an action to delay', () => {
        let duration = 1000;
        let expectedAction = {
            type: UTILITY_DELAY,
            payload: {
                duration,
            },
        };
        expect(delay(duration)).toEqual(expectedAction);
    });
});
