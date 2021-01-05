import {PayloadAction} from '@reduxjs/toolkit';
import {DetectionStates, AppConfig} from '../types/StateTypes';

interface DetectionPayload {
    detectionState: DetectionStates;
}

export type DetectionStateAction = PayloadAction<DetectionPayload>;
export type SetConfigAction = PayloadAction<AppConfig>;
