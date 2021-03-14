import {createSelector} from '@reduxjs/toolkit';
import {RecognitionConfig} from 'src/types/TaskTypes';
import {RequestStates, RootState, VoiceState} from 'types/StateTypes';

export const getVoiceState = (state: RootState): VoiceState => state.voice;

export const getStartListeningStatus = (state: RootState) =>
    getVoiceState(state).startListeningStatus;

export const getIsListening = createSelector(
    getStartListeningStatus,
    (status) => status.status === RequestStates.SUCCESSFUL,
);

export const getSuspendListeningStatus = (state: RootState) =>
    getVoiceState(state).suspendListeningStatus;

export const getIsSuspended = createSelector(
    getSuspendListeningStatus,
    (status) => status.status === RequestStates.SUCCESSFUL,
);

export const getRecognitionConfigurations = createSelector(
    getStartListeningStatus,
    (status) => status.result?.configurations,
);

export const getRecognitionConfigsByWords = createSelector(
    getRecognitionConfigurations,
    (configs) => {
        if (configs == null) {
            return null;
        }
        let wordMap = new Map<string, RecognitionConfig>();
        for (let config of configs) {
            for (let word of config.words) {
                wordMap.set(word, config);
            }
        }
        return wordMap;
    },
);

export const getRecognitionConfigForWord = createSelector(
    getRecognitionConfigsByWords,
    (_: RootState, word: string) => word,
    (configMap, word) => {
        return configMap?.get(word);
    },
);
