import {PayloadAction} from '@reduxjs/toolkit';
import {DetectionStates, AppConfig} from 'types/StateTypes';
import {RequestStatusAction} from 'types/ActionTypes';

interface DetectionPayload {
    detectionState: DetectionStates;
}

export type DetectionStateAction = PayloadAction<DetectionPayload>;
export type FetchConfigRequestStatusAction = RequestStatusAction<
    void,
    AppConfig
>;
