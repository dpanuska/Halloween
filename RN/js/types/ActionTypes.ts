import {PayloadAction} from '@reduxjs/toolkit';
import {RequestStates} from '../types/StateTypes';

export interface RequestStatusPayload {
  status: RequestStates;
  error?: Error;
  result?: any;
}

export type RequestStatusAction = PayloadAction<RequestStatusPayload>;
