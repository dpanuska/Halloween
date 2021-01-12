import {RequestStatusAction} from 'types/ActionTypes';
import {TaskConfig} from 'types/StateTypes';
import {TaskList} from './TaskTypes';

export type FetchConfigRequestStatusAction = RequestStatusAction<
    void,
    TaskConfig
>;

export type FetchTasksRequestStatusAction = RequestStatusAction<
    void,
    TaskList[]
>;
