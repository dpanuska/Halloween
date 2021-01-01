import {RootState, SpeechState} from '../types/StateTypes';

export const getSpeechState = (state: RootState): SpeechState => state.speech;

export const getIsSpeaking = (state: RootState): boolean =>
    getSpeechState(state).isSpeaking;

export const getIsSettingRate = (state: RootState): boolean =>
    getSpeechState(state).isSettingRate;

export const getIsSettingPitch = (state: RootState): boolean =>
    getSpeechState(state).isSettingPitch;

export const getIsSettingLocale = (state: RootState): boolean =>
    getSpeechState(state).isSettingLocale;
