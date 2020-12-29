import {PayloadAction} from '@reduxjs/toolkit';
import {DetectionStates} from '../types/StateTypes';

interface DetectionPayload {
  detectionState: DetectionStates;
}

export type DetectionStateAction = PayloadAction<DetectionPayload>;
