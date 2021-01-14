import {Action} from 'redux';
import {Task, TaskResult} from './TaskTypes';

// Note - Calling sagas directly here to see how it works out.
// Other options:
// - Use Thunk actions (async actions)
//      - mixing saga and thunk without really needing too could be messy
// - Try using channels to pass task result back from general put actions only (no calling saga directly)
// - Try with put action and expected end action (SUCCESS/FAIL) to wait
//      - problem here is needs to check specifically for same action
export interface TaskGenerator {
    action: Action;
    generator?: (...args: any) => any;
}

export interface TaskGeneratorMap {
    [x: string]: (
        task: Task,
        previousResult?: TaskResult,
    ) => TaskGenerator | null;
}
