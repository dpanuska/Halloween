import {PayloadAction} from '@reduxjs/toolkit';
import {RequestStates} from 'types/StateTypes';

export interface RequestStatusPayload<P = void, R = void> {
    status: RequestStates;
    params?: P;
    error?: Error;
    result?: R;
}

export type RequestStatusAction<P = void, R = void> = PayloadAction<
    RequestStatusPayload<P, R>
>;
