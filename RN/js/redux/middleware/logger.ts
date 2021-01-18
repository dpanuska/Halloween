import {Action, AnyAction, Dispatch} from 'redux';
import {RequestStatusAction} from 'src/types/ActionTypes';
import {RequestStates} from 'src/types/StateTypes';

const requestErrorLogger = () => (next: Dispatch<AnyAction>) => (
    action: Action,
) => {
    if (isRequestErrorAction(action)) {
        console.error(
            'Request Action Failed with error',
            action,
            action.payload.error,
        );
    } else {
        console.debug('Action Dispatched', action);
    }
    let result = next(action);
    return result;
};

function isRequestErrorAction(action: any): action is RequestStatusAction {
    return action.payload?.status === RequestStates.FAILED;
}

export default requestErrorLogger;
