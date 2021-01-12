import {createSelector} from '@reduxjs/toolkit';
import {RequestStates, RootState, SpeechState} from 'types/StateTypes';

export const getSpeechState = (state: RootState): SpeechState => state.tts;

export const getInitState = (state: RootState) =>
    getSpeechState(state).initStatus;

export const getIsInitialized = createSelector(
    getInitState,
    (init) => init.status === RequestStates.SUCCESSFUL,
);

export const getAvailableLanguages = createSelector(
    getInitState,
    (init) => init.result?.availableLanguages,
);

export const getIsSpeaking = (state: RootState): boolean =>
    getSpeechState(state).isSpeaking;

export const getIsSettingRate = (state: RootState): boolean =>
    getSpeechState(state).isSettingRate;

export const getIsSettingPitch = (state: RootState): boolean =>
    getSpeechState(state).isSettingPitch;

export const getIsSettingLocale = (state: RootState): boolean =>
    getSpeechState(state).isSettingLocale;
